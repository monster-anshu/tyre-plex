import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const VerifyOtpZod = z.object({
  otp: z.string().nonempty(),
});

export class VerifyOtpDto extends createZodDto(VerifyOtpZod) {}
