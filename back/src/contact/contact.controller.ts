import {
  Body,
  Controller,
  Post,
  Response as ResDecorator,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendFormDto } from './interface/send-form.dto';
import { Response } from 'express';

@Controller('contact')
export class ContactController {
  constructor(private readonly ContactService: ContactService) {}
  @Post()
  async mailContactForm(
    @ResDecorator() response: Response,
    @Body() body: SendFormDto,
  ) {
    try {
      await Promise.all([this.ContactService.mailer(body)]);
      return response.status(200).json({
        message: 'success',
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Error sending email',
        error: error.message,
      });
    }
  }
}
