import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'requestnescol@gmail.com', // sender Gmail account
        pass: 'fizwcaxueyaoyzvt', // app password (NOT real Gmail password)
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    await this.transporter.sendMail({
      from: '"Enid Innovations | Studio" <requestnescol@gmail.com>', // sender name & email
      to,
      subject,
      text,
      html,
    });
  }
}
