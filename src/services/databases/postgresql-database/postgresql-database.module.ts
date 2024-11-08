import { Module } from '@nestjs/common';
import { PostgresqlDatabaseService } from './postgresql-database.service';

@Module({
  providers: [PostgresqlDatabaseService],
  exports: [PostgresqlDatabaseService],
})
export class PostgresqlDatabaseModule {}
