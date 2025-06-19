import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './admin/auth.module';
import mailer from './environnement/mailer';
import database from './environnement/database';
import admin from './environnement/admin';

@Module({
  imports: [
    ContactModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailer, database, admin],
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig) => ({
        type: 'postgres',
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        username: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
      inject: [database.KEY],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
