import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './services/global/socket-io/socket-io.adapter';
import { methods } from './app.data';

const port = 3000;

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // helmet
  // app.use(helmet({}));

  // CORS
  app.enableCors({
    origin: '*',
    methods: methods,
    credentials: true,
  });

  // const redisAdpater = new SocketIoAdapter(app);
  // redisAdpater.setLogger(logger);
  // app.useWebSocketAdapter(redisAdpater);

  await app.listen(port, () => {
    console.log(`
    Server is running on port: ${port}
    Current Process ID: ${process.pid}
`);
  });
}
bootstrap();
