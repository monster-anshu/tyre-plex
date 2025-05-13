import { client } from './client';

export class OtpService {
  static async send(email: string) {
    const { data } = await client.post('/otp/send', {
      identifier: email,
    });
    return data;
  }

  static async verify(otp: string) {
    const { data } = await client.post('/otp/verify', {
      otp: otp,
    });
    return data;
  }
}
