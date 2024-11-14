import { join } from 'path';
import { cwd } from 'process';

const currentWorkingDir = cwd();

export const AppEnvValues = {
  DATABASE_DIR: join(currentWorkingDir, 'database'),
  REDIS_URL: 'redis://10.0.233.121:6379',
};
