import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mainDatabaseConfig } from './services/databases/main-database/main-database.config';
import { MainDatabaseModule } from './services/databases/main-database/main-database.module';
import { TitlesModule } from './apps/main/titles/titles.module';
import { SecondaryDatabaseModule } from './services/databases/secondary-database/secondary-database.module';
import { DatabaseEnum } from './resources/enum/database.enum';
import { secondaryDatabaseConfig } from './services/databases/secondary-database/secondary-database.config';
import { SnackModule } from './apps/secondary/snack/snack.module';
import { UsersModule } from './apps/main/users/users.module';

@Module({
  imports: [
    // Typeorm
    TypeOrmModule.forRoot(mainDatabaseConfig),
    TypeOrmModule.forRootAsync({
      name: DatabaseEnum.SECONDARY,
      useFactory: () => secondaryDatabaseConfig,
    }),

    // Modules
    UsersModule,
    MainDatabaseModule,
    TitlesModule,
    SecondaryDatabaseModule,
    SnackModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
