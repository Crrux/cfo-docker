import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mailer from '../environnement/mailer';
import { Contact } from './entities/contact.entity';
import { ContactError } from './entities/contact-error.entity';
import { DataCleanupService } from './tasks/data-cleanup.service';
import { AuthModule } from '../admin/auth.module';

@Module({
  imports: [
    ConfigModule.forFeature(mailer),
    ConfigModule,
    TypeOrmModule.forFeature([Contact, ContactError]),
    AuthModule,
  ],
  controllers: [ContactController],
  providers: [ContactService, DataCleanupService],
})
export class ContactModule {}
