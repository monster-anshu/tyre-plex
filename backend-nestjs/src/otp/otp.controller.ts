import { Body, Controller, Post } from '@nestjs/common';
import { SendOtpDto } from './dto/send-otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post()
  async send(@Body() body: SendOtpDto) {
    await this.otpService.send(body);
    return {
      isSuccess: true,
    };
  }
}
