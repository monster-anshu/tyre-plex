import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import Redis from 'ioredis';
import { signJwt } from '~/jwt';
import { REDIS_PROVIDER_NAME } from '~/redis/redis.module';
import { UserService } from '~/user/user.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class OtpService {
  constructor(
    @Inject(REDIS_PROVIDER_NAME) private readonly redis: Redis,
    private readonly userService: UserService
  ) {}

  static readonly OTP_TTL = 300;
  static readonly ATTEMPT_TTL = 600;
  static readonly MAX_ATTEMPTS = 5;

  private generateOtp(
    length = 10,
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  ) {
    let result = '';
    for (let i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  private getOtpKey(identifier: string): string {
    return `otp:${identifier}`;
  }

  private getAttemptKey(identifier: string): string {
    return `otp_attempts:${identifier}`;
  }

  async send({ identifier }: SendOtpDto) {
    const attemptKey = this.getAttemptKey(identifier);
    const otpKey = this.getOtpKey(identifier);

    const attempts = await this.redis.incr(attemptKey);

    if (attempts === 1) {
      await this.redis.expire(attemptKey, OtpService.ATTEMPT_TTL);
    }

    if (attempts > OtpService.MAX_ATTEMPTS) {
      throw new HttpException(
        'Maximum OTP attempts exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    const otp = this.generateOtp();
    await this.redis.set(otpKey, otp, 'EX', OtpService.OTP_TTL);
    const token = signJwt(
      {
        identifier: identifier,
        verified: false,
      },
      {
        expiresIn: OtpService.OTP_TTL,
      }
    );
    return token;
  }

  async verify(identifier: string, { otp }: VerifyOtpDto) {
    const attemptKey = this.getAttemptKey(identifier);
    const otpKey = this.getOtpKey(identifier);
    const storedOtp = await this.redis.get(otpKey);

    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Invalid otp');
    }

    await this.redis.del(otpKey);
    await this.redis.del(attemptKey);

    let user = await this.userService.getByEmail(identifier);
    if (!user) {
      user = await this.userService.add({ email: identifier });
    }

    const token = signJwt(
      {
        identifier: identifier,
        verified: true,
        userId: user.id,
      },
      {
        expiresIn: 3600 * 24, // 1 day
      }
    );

    return token;
  }
}
