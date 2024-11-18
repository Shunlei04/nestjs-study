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
import { PostgresqlDatabaseModule } from './services/databases/postgresql-database/postgresql-database.module';
import { SecondaryDatabaseModule } from './services/databases/secondary-database/secondary-database.module';
import { AjvModule } from './services/global/ajv/ajv.module';
import { mainDatabaseConfig } from './services/databases/main-database/main-database.config';
import { DatabaseEnum } from './resources/enum/database.enum';
import { secondaryDatabaseConfig } from './services/databases/secondary-database/secondary-database.config';
import { AuthModule } from './apps/main/auth/auth.module';
import { CryptoJsModule } from './services/individual/crypto/crypto.module';
import { TokenModule } from './services/global/token/token.module';
import { APP_GUARD } from '@nestjs/core';
import { User } from './apps/main/users/entities/user.entity';
import { AppGuardGuard } from './guards/app-guard/app-guard.guard';
import { AssignReqGuard } from './guards/assign-req/assign-req.guard';
import { PolicyGuard } from './guards/policy/policy.guard';
import { TokenPayloadType } from './apps/main/auth/auth.type';

declare global {
  namespace Express {
    interface Request {
      user: User | null;
      isRouterPublic: boolean;
      isRouterOnlyForAdmin: boolean;
      tokenPayload: TokenPayloadType;
    }
  }
}

@Module({
  imports: [
    // Typeorm
    TypeOrmModule.forRoot(mainDatabaseConfig),
    TypeOrmModule.forRootAsync({
      name: DatabaseEnum.SECONDARY,
      useFactory: () => secondaryDatabaseConfig,
    }),

    // TypeOrmModule.forRootAsync({
    //   name: DatabaseEnum.POSTGRESQL,
    //   useFactory: () => postgresqlDatabaseConfig,
    // }),

    // TypeOrmModule.forRoot(postgresqlDatabaseConfig),

    // Modules
    AjvModule,
    AuthModule,
    BedsModule,
    CryptoJsModule,
    DepartmentsModule,
    MainDatabaseModule,
    PostgresqlDatabaseModule,
    RolesModule,
    SecondaryDatabaseModule,
    SnackModule,
    TitlesModule,
    TokenModule,
    UsersModule,
    WardsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AssignReqGuard,
    PolicyGuard,
    { provide: APP_GUARD, useClass: AppGuardGuard },
  ],
})
export class AppModule {}
