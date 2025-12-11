import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
  }

  async sendOtp(email: string, otp: string) {
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: 'Your OTP Code',
      html: `<h3>Your OTP is: ${otp}</h3>`,
    });
  }

  async sendResetOtp(email: string, otp: string) {
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject: 'Reset Password OTP',
      html: `<p>Use this OTP to reset your password: <b>${otp}</b></p>`,
    });
  }
}
