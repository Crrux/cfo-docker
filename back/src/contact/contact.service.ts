import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import mailer from 'src/environnement/mailer';
import { ConfigType } from '@nestjs/config';
import { SendFormDto } from './interface/send-form.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly mailService: MailerService,
    @Inject(mailer.KEY)
    private mailerConfig: ConfigType<typeof mailer>,
  ) {}

  async mailer(body: SendFormDto): Promise<void> {
    const currentDate = new Date();
    const Reference = `${currentDate.toISOString().replace(/\D/g, '')}${body.firstname[0]}${body.name[0]}${body.tel.slice(-4)}`;
    body.reference = Reference.toUpperCase();
    try {
      await this.mailService.sendMail({
        from: `${this.mailerConfig.USERNAME_NAME} <${this.mailerConfig.USERNAME}>`,
        to: `${this.mailerConfig.SUBJECT}`,
        subject: `Formulaire CFO ${body.name.charAt(0).toUpperCase() + body.name.slice(1).toLowerCase()} ${body.firstname.charAt(0).toUpperCase() + body.firstname.slice(1).toLowerCase()}`,
        html: `
            <div>
              <h1 style="color:blue;">Formulaire Site crossfitobernai.com</h1>
              <p><span style="font-weight:bold; margin: 0; padding: 0;">Nom / Prenom:</span><p>
              <pre>${body.name.charAt(0).toUpperCase() + body.name.slice(1).toLowerCase()} ${body.firstname.charAt(0).toUpperCase() + body.firstname.slice(1).toLowerCase()}</pre>
              <p><span style="font-weight:bold; margin: 0; padding: 0;">Email:</span> </p>
              <pre>${body.email}</pre>
              <p><span style="font-weight:bold; margin: 0; padding: 0;">Téléphone:</span></p>
              <pre>${body.tel}</pre>
              <p><span style="font-weight:bold; margin: 0; padding: 0;">Message:</span> </p>
              <pre>${body.message}</pre>
              <p>Mentions légales: ${body.checkbox ? 'Acceptées' : 'Refusées'}</p>
              <p style="font-size:0.5rem"><span style="font-weight:bold;">Référence:</span> ${body.reference}</p>
            </div>`,
      });
      this.logger.log(`form sent`);
    } catch (error) {
      this.logger.error(
        `${currentDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })} form not sent`,
        error,
      );
      throw new Error(error);
    }
  }
}
