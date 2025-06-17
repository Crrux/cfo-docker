import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ConfigModule } from '@nestjs/config';
import mailer from '../environnement/mailer';

@Module({
  imports: [ConfigModule.forFeature(mailer), ConfigModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
