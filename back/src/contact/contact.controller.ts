import {
  Body,
  Controller,
  Post,
  Response,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { SendFormDto } from './interface/send-form.dto';
import { DataCleanupService } from './tasks/data-cleanup.service';
import { JwtAuthGuard } from 'src/admin/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly ContactService: ContactService,
    private readonly dataCleanupService: DataCleanupService,
  ) {}
  @Post()
  async mailContactForm(@Response() response, @Body() body: SendFormDto) {
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
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllContacts() {
    return await this.ContactService.findAll();
  }
  @Post('cleanup')
  @UseGuards(JwtAuthGuard)
  async triggerCleanup(@Response() response) {
    try {
      const result = await this.dataCleanupService.triggerManualCleanup();
      return response.status(200).json({
        message: result,
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Error during data cleanup',
        error: error.message,
      });
    }
  }
}
