import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
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
    // casl ability
    // const ability = buildTitleAbility();
    // console.log('Can read title', ability.can('read', 'Post'));
    // console.log('Can write title', ability.can('write', 'Post', 'content'));
    // console.log('Can update title', ability.can('update', 'Post'));
    // console.log('Can delete title', ability.can('delete', 'Post'));
    // console.log('Can comment title', ability.can('comment', 'Post'));
    // console.log('Can approve title', ability.can('approved', 'Post'));

    // console.log('Can Public title', ability.can('canPublic', 'Post'));
    // console.log('Can allow comment title', ability.can('allowComent', 'Post'));
  });
}
bootstrap();

// const user = {
//   id: 1,
//   username: 'shun',
//   role: 'user',
// };
// const post = {
//   id: 1,
//   owner: 2,
//   collaborator: 1,
//   isPulic: false,
//   allowCommnet: false,
//   title: 'Post Title',
//   content: 'Post Content',
//   approved: true,
// };
