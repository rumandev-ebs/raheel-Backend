import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Hash } from '../../common/utils/hash.util';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
  ) {}

  // --- helper for error handling ---
  private handleError(error: any, context: string): never {
    // Known Nest exceptions: rethrow
    if (error instanceof HttpException) {
      throw error;
    }

    // Log full error for debugging
    console.error(`[AuthService:${context}]`, error);

    // Generic error to client
    throw new InternalServerErrorException('Something went wrong. Please try again.');
  }

  // Generate OTP
  private genOtp(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  // ------------------- REGISTER -------------------
  async register(dto: RegisterDto) {
    try {
      const exists = await this.usersService.findByEmail(dto.email);
      if (exists) {
        throw new BadRequestException('Email already registered');
      }

      const hashed = await Hash.make(dto.password);
      const otp = this.genOtp();

      const user = await this.usersService.create({
        ...dto,
        password: hashed,
        otpCode: otp,
        otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 min
      });

       if (!user) {
        throw new BadRequestException('User is not created');
      }

      await this.mail.sendOtp(user?.email, otp);

      return { message: 'OTP sent to email' };
    } catch (error) {
      this.handleError(error, 'register');
    }
  }

  // ------------------- VERIFY OTP -------------------
  async verifyOtp(dto: VerifyOtpDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.otpCode || !user.otpExpiry) {
        throw new BadRequestException('No OTP found, please register again');
      }

      if (user.otpCode !== dto.otp || user.otpExpiry < new Date()) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      user.emailVerified = true;
      user.otpCode = undefined;
      user.otpExpiry = undefined;

      await user.save();

      return { message: 'Email verified successfully' };
    } catch (error) {
      this.handleError(error, 'verifyOtp');
    }
  }

  // ------------------- LOGIN -------------------
  async login(dto: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const valid = await Hash.compare(dto.password, user.password);
      if (!valid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      if (!user.emailVerified) {
        throw new UnauthorizedException('Email not verified');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Account is inactive');
      }

      const token = this.jwt.sign({ id: user._id, email: user.email, role: user.role });

      return {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      };
    } catch (error) {
      this.handleError(error, 'login');
    }
  }

  // ------------------- FORGOT PASSWORD (SEND OTP) -------------------
  async forgotPassword(dto: ForgotPasswordDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      if (!user) {
        throw new NotFoundException('Email not found');
      }

      const otp = this.genOtp();

      user.resetOtp = otp;
      user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      await user.save();

      await this.mail.sendResetOtp(user.email, otp);

      return { message: 'Reset OTP sent' };
    } catch (error) {
      this.handleError(error, 'forgotPassword');
    }
  }

  // ------------------- RESET PASSWORD -------------------
  async resetPassword(dto: ResetPasswordDto) {
    try {
      const user = await this.usersService.findByEmail(dto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!user.resetOtp || !user.resetOtpExpiry) {
        throw new BadRequestException('No reset OTP found');
      }

      if (user.resetOtp !== dto.otp || user.resetOtpExpiry < new Date()) {
        throw new BadRequestException('Invalid or expired OTP');
      }

      user.password = await Hash.make(dto.newPassword);
      user.resetOtp = undefined;
      user.resetOtpExpiry = undefined;

      await user.save();

      return { message: 'Password reset successfully' };
    } catch (error) {
      this.handleError(error, 'resetPassword');
    }
  }
}
