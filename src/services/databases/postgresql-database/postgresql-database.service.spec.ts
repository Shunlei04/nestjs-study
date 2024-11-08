import { Test, TestingModule } from '@nestjs/testing';
import { PostgresqlDatabaseService } from './postgresql-database.service';

describe('PostgresqlDatabaseService', () => {
  let service: PostgresqlDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresqlDatabaseService],
    }).compile();

    service = module.get<PostgresqlDatabaseService>(PostgresqlDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
