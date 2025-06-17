import { Inject, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import mailer from 'src/environnement/mailer';
import { ConfigType } from '@nestjs/config';
import { SendFormDto } from './interface/send-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { ContactError } from './entities/contact-error.entity';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @Inject(mailer.KEY)
    private mailerConfig: ConfigType<typeof mailer>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(ContactError)
    private contactErrorRepository: Repository<ContactError>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.mailerConfig.HOSTNAME,
      port: 465,
      secure: true,
      auth: {
        user: this.mailerConfig.USERNAME,
        pass: this.mailerConfig.PASSWORD,
      },
    });
  }

  async mailer(body: SendFormDto): Promise<void> {
    const currentDate = new Date();
    const Reference = `${currentDate.toISOString().replace(/\D/g, '')}${body.firstname[0]}${body.name[0]}${body.tel.slice(-4)}`;
    body.reference = Reference.toUpperCase();

    try {
      await this.transporter.sendMail({
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

      // Enregistrement du contact dans la base de données après envoi réussi
      await this.saveContact(body);

      this.logger.log(
        `Form sent and saved to database - Ref: ${body.reference}`,
      );
    } catch (error) {
      // Enregistrement de l'erreur dans la base de données
      await this.saveContactError(body, error);

      this.logger.error(
        `${currentDate.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })} form not sent - Ref: ${body.reference}`,
        error,
      );
      throw new Error(error);
    }
  }

  private async saveContact(contactData: SendFormDto): Promise<void> {
    const contact = this.contactRepository.create({
      name: contactData.name,
      firstname: contactData.firstname,
      email: contactData.email,
      tel: contactData.tel,
      message: contactData.message,
      checkbox: contactData.checkbox,
      reference: contactData.reference,
    });

    await this.contactRepository.save(contact);
  }

  private async saveContactError(
    contactData: SendFormDto,
    error: any,
  ): Promise<void> {
    const contactError = this.contactErrorRepository.create({
      name: contactData.name,
      firstname: contactData.firstname,
      email: contactData.email,
      tel: contactData.tel,
      message: contactData.message,
      checkbox: contactData.checkbox,
      reference: contactData.reference,
      errorMessage: error.message || JSON.stringify(error),
    });

    try {
      await this.contactErrorRepository.save(contactError);
    } catch (dbError) {
      this.logger.error('Failed to save contact error to database', dbError);
    }
  }
}
