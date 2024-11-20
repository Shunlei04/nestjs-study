import { join } from 'path';
import { AppEnvValues } from 'src/resources/env/app.env';
import { DataSourceOptions } from 'typeorm';

export const postgresqlDatabaseConfig: DataSourceOptions = {
  // type: 'postgres',
  // port: 5432,
  // host: '',
  // username: 'postgres',
  // password: 'Amo@phh123',
  // database: 'dev-slkt',

  // entities: ['./dist/apps/postgresql/**/*.entity.js'],

  // synchronize: true,

  type: 'sqlite',
  database: join(AppEnvValues.DATABASE_DIR, 'postgresql-database.sqlite'),

  entities: ['./dist/apps/postgresql/**/*.entity.js'],

  synchronize: true,
  enableWAL: true,
};
