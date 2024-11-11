import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './apps/main/roles/roles.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { UsersModule } from './apps/main/users/users.module';
import { BedsModule } from './apps/postgresql/beds/beds.module';
import { DepartmentsModule } from './apps/postgresql/departments/departments.module';
import { WardsModule } from './apps/postgresql/wards/wards.module';
import { SnackModule } from './apps/secondary/snack/snack.module';
import { MainDatabaseModule } from './services/databases/main-database/main-database.module';
import { postgresqlDatabaseConfig } from './services/databases/postgresql-database/postgresql-database.config';
import { PostgresqlDatabaseModule } from './services/databases/postgresql-database/postgresql-database.module';
import { SecondaryDatabaseModule } from './services/databases/secondary-database/secondary-database.module';
import { AjvModule } from './services/global/ajv/ajv.module';

@Module({
  imports: [
    // Typeorm
    // TypeOrmModule.forRoot(mainDatabaseConfig),
    // TypeOrmModule.forRootAsync({
    //   name: DatabaseEnum.SECONDARY,
    //   useFactory: () => secondaryDatabaseConfig,
    // }),

    // TypeOrmModule.forRootAsync({
    //   name: DatabaseEnum.POSTGRESQL,
    //   useFactory: () => postgresqlDatabaseConfig,
    // }),

    TypeOrmModule.forRoot(postgresqlDatabaseConfig),

    // Modules
    UsersModule,
    MainDatabaseModule,
    TitlesModule,
    SecondaryDatabaseModule,
    SnackModule,
    RolesModule,
    PostgresqlDatabaseModule,
    DepartmentsModule,
    WardsModule,
    BedsModule,
    AjvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
