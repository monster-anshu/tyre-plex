import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService],
  imports: [RedisModule],
})
export class OtpModule {}
