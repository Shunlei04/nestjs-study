import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // helmet
  // app.use(helmet({}));

  // CORS
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(port);

  console.log(`
    Sever started on port ${port}
    `);
}
bootstrap();
