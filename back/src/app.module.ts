import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'node:process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import mailer from './environnement/mailer';
import { User } from './auth/entities/user.entity';
import { PlanningImage } from './auth/entities/planning-image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailer],
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev',
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [User, PlanningImage],
      synchronize: true, // À mettre à false en production
    }),
    ContactModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
