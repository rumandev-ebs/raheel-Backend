import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() dto) {
    return this.auth.register(dto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto) {
    return this.auth.verifyOtp(dto);
  }

  @Post('login')
  login(@Body() dto) {
    return this.auth.login(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto) {
    return this.auth.forgotPassword(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto) {
    return this.auth.resetPassword(dto);
  }
}
