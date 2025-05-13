import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_PROVIDER_NAME } from 'src/redis/redis.module';
import { SendOtpDto } from './dto/send-otp.dto';

type OtpPayload = {
  email: string;
  otp: string;
  id: string;
};
@Injectable()
export class OtpService {
  constructor(@Inject(REDIS_PROVIDER_NAME) private readonly redis: Redis) {}

  private OTP_TTL = 300;
  private ATTEMPT_TTL = 600;
  private MAX_ATTEMPTS = 5;

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

  async send({ emailId }: SendOtpDto) {
    const attemptKey = this.getAttemptKey(emailId);
    const otpKey = this.getOtpKey(emailId);

    const attempts = await this.redis.incr(attemptKey);

    if (attempts === 1) {
      await this.redis.expire(attemptKey, this.ATTEMPT_TTL);
    }

    if (attempts > this.MAX_ATTEMPTS) {
      throw new HttpException(
        'Maximum OTP attempts exceeded. Please try again later.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    const otp = this.generateOtp();
    await this.redis.set(otpKey, otp, 'EX', this.OTP_TTL);
  }
}
