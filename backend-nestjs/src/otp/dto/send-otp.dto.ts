import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const SendOtpZod = z.object({
  identifier: z.string().email(),
});

export class SendOtpDto extends createZodDto(SendOtpZod) {}
