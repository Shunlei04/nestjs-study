import { Injectable } from '@nestjs/common';

const users = [
  {
    name: 'John',
    username: 'johndoe',
  },
  {
    name: 'John 2',
    username: 'johndoe2',
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers() {
    return users;
  }
}
