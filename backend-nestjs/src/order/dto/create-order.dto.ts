import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const CreateOrderZod = z.object({
  amount: z.number().min(1),
});

export class CreateOrderDto extends createZodDto(CreateOrderZod) {}
