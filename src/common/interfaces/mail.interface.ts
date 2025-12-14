

export interface ISendEmail {
  to: string | string[];
  subject: string;
  html: any;
}

export interface ISendOTPEmailPayload {
  name?: string;
  to: string;
  subject: string;
  otp: number;
}

export interface ISendBlogEmailPayload {
  to: string[];
  subject: string;
}
export interface ISendContactUsEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}