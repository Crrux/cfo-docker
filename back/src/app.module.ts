import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import mailer from './environnement/mailer';

@Module({
  imports: [
    ContactModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailer],
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
