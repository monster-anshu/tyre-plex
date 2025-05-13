import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [RedisModule, OtpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
