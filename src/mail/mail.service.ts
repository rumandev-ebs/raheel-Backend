// import { Injectable } from '@nestjs/common';
// import * as sgMail from '@sendgrid/mail';

// @Injectable()
// export class MailService {
//   constructor() {
//     sgMail.setApiKey(process.env.SENDGRID_KEY);
//   }

//   async sendOtp(email: string, otp: string) {
//     await sgMail.send({
//       to: email,
//       from: process.env.SENDGRID_SENDER,
//       subject: 'Your OTP Code',
//       html: `<h3>Your OTP is: ${otp}</h3>`,
//     });
//   }

//   async sendResetOtp(email: string, otp: string) {
//     await sgMail.send({
//       to: email,
//       from: process.env.SENDGRID_SENDER,
//       subject: 'Reset Password OTP',
//       html: `<p>Use this OTP to reset your password: <b>${otp}</b></p>`,
//     });
//   }
// }

// ** Nest
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import sgMail from '@sendgrid/mail';
import {
  ISendBlogEmailPayload,
  ISendContactUsEmailPayload,
  ISendEmail,
  ISendOTPEmailPayload,
} from 'src/common/interfaces/mail.interface';
import {
  ContactUsTemplate,
  OtpEmailTemplate,
} from 'src/common/templates/otpEmailTemplate';

@Injectable()
export class MailService {
  private readonly FROM_EMAIL: string;

  constructor(private readonly configService: ConfigService) {
    const SENDGRID_API_KEY = this.configService.get<string>('SENDGRID_API_KEY');
    this.FROM_EMAIL =
      this.configService.get<string>('FROM_EMAIL') ?? 'no-reply@example.com';

    if (!SENDGRID_API_KEY || !this.FROM_EMAIL) {
      throw new Error('SendGrid configuration is missing!');
    }

    sgMail.setApiKey(SENDGRID_API_KEY);
  }

  // Send OTP Email
  async sendOTPEmail(payload: ISendOTPEmailPayload) {
    try {
      const { name, to, subject, otp } = payload;
      const otpEmailTemplate = name && OtpEmailTemplate(name, otp);

      await this.sendEmail({
        to,
        subject,
        html: otpEmailTemplate,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Send Blog Email
  //   async sendBlogEmail(payload: ISendBlogEmailPayload) {
  //     try {
  //       const { to, subject } = payload;
  //     //   const sendBlogEmailTemplate = SendBlogOnMail(blog);

  //       await this.sendEmail({
  //         to,
  //         subject,
  //         // html: sendBlogEmailTemplate,
  //       });
  //     } catch (error) {
  //       throw new InternalServerErrorException(error.message);
  //     }
  //   }

  // Send Contact Us Email
  async sendContactUsEmail(payload: ISendContactUsEmailPayload) {
    try {
      const { name, email, subject, message } = payload;
      const to = 'rumanu.dev@gmail.com';
      const contactUsTemplate = ContactUsTemplate(name, email, message);

      await this.sendEmail({
        to,
        subject,
        html: contactUsTemplate,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Send Email with SendGrid
  private async sendEmail(payload: ISendEmail) {
    try {
      const { to, subject, html } = payload;

      const msg = {
        to,
        from: this.FROM_EMAIL,
        subject,
        html,
      };

      const response = await sgMail.send(msg);
      return response;
    } catch (error) {
      console.log('error', error);
    }
  }
}
