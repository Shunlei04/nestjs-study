import { DataSourceOptions } from 'typeorm';

export const postgresqlDatabaseConfig: DataSourceOptions = {
  type: 'postgres',
  port: 5432,
  host: '10.0.233.121',
  username: 'postgres',
  password: 'Amo@phh123',
  database: 'dev-slkt',

  entities: ['./dist/apps/postgresql/**/*.entity.js'],

  synchronize: true,
};
