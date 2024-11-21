import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { join } from 'path';
import { IsPulic } from './guards/policy/decorator/policy.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('app')
  redirectToIndexFile(@Res() res: Response) {
    res.redirect('/app/index.html');
  }

  @Get('app/*')
  getHello(@Param('0') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../public/app', filename);

    res.sendFile(filePath);
  }

  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('users')
  // getUsers() {
  //   return this.appService.getUsers();
  // }
}
