import { Body, Controller, Post } from '@nestjs/common';
import { GetSession, SetCookie } from '~/session/session.decorator';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('send')
  async send(@Body() body: SendOtpDto, @SetCookie() setCookie: SetCookie) {
    const token = await this.otpService.send(body);
    const expriry = Date.now() + OtpService.OTP_TTL * 1000;

    setCookie('__session__', token, {
      expires: new Date(expriry),
      httpOnly: true,
    });

    return {
      isSuccess: true,
    };
  }

  @Post('verify')
  async verify(
    @Body() body: VerifyOtpDto,
    @GetSession('identifier') identifier: string,
    @SetCookie() setCookie: SetCookie
  ) {
    const token = await this.otpService.verify(identifier, body);
    const expriry = Date.now() + 3600 * 1000;

    setCookie('__session__', token, {
      expires: new Date(expriry),
      httpOnly: true,
    });

    return {
      isSuccess: true,
    };
  }
}
