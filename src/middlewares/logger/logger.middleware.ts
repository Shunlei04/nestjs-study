import { Injectable, NestMiddleware } from '@nestjs/common';
import { differenceInMilliseconds, format } from 'date-fns';
import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import { MongodbService } from 'src/services/individual/mongodb/mongodb.service';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logCollection!: Collection;

  constructor(private mongodbService: MongodbService) {
    this.connectToLogCollection();
  }

  async connectToLogCollection() {
    const client = await this.mongodbService.connect();
    const db = client.db('dev-slkt');
    this.logCollection = db.collection('dev-slkt-logs');
  }

  use(req: Request, res: Response, next: () => void) {
    const startTime = new Date();
    const id = uuidv7();

    // incoming request
    console.log(
      `[REQUEST] METHOD: ${req.method} ID: ${id} IP: ${req.ip} TIME: ${format(startTime, 'yyyy-MM-dd HH:mm:ss')} URL: ${req.path}`,
    );

    this.logCollection.insertOne({
      operation: 'REQUEST',
      method: req.method,
      id: id,
      ip: req.ip,
      startTime: startTime,
      url: req.url,
      user: req.user,
      headers: req.headers,
      origin: req.headers.origin,
    });

    // wrap method
    const wrapMethod = (methodName: string, method: any) => {
      const logCollection = this.logCollection;
      return function (this: Response, ...args) {
        const newResponse = method.bind(this)(...args);

        const responseTime = Date.now();

        // response log
        console.log(
          `[RESPONSE] MATHOD:${method.name} ID: ${id} IP: ${req.ip} REQ_TIME: ${format(startTime, 'yyyy-MM-dd HH:mm:ss')} RES_TIME: ${format(responseTime, 'yyyy-MM-dd HH:mm:ss')} DURATION: ${differenceInMilliseconds(responseTime, startTime)}ms STATUS: ${res.statusCode} URL: ${req.path}`,
        );

        logCollection.insertOne({
          operation: 'RESPONSE',
          method: method.name,
          id: id,
          ip: req.ip,
          reqTime: startTime,
          resTime: responseTime,
          resStatus: this.statusCode,
          resMessage: this.statusMessage,
          resDuration: differenceInMilliseconds(responseTime, startTime),
          url: req.url,
          user: req.user,
          headers: req.headers,
          origin: req.headers.origin,
        });

        return newResponse;
      };
    };

    // response
    res.json = wrapMethod('json', res.json);
    res.send = wrapMethod('send', res.send);
    res.sendFile = wrapMethod('sendFile', res.sendFile);
    res.redirect = wrapMethod('redirect', res.redirect);
    res.download = wrapMethod('download', res.download);
    res.end = wrapMethod('end', res.end);

    next();
  }
}
