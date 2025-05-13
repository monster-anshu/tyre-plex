import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const CreateOrderZod = z.object({
  amount: z.number(),
});

export class CreateOrderDto extends createZodDto(CreateOrderZod) {}
