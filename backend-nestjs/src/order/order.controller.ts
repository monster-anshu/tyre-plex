import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from '~/user/user.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@UseGuards(UserGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async list(@GetSession('userId') userId: number) {
    const orders = await this.orderService.list(userId);
    return {
      isSuccess: true,
      orders,
    };
  }

  @Get(':orderId')
  async get(
    @GetSession('userId') userId: number,
    @Param('orderId') orderId: string
  ) {
    const parsed = Number(orderId);
    if (isNaN(parsed) || parsed < 1) {
      throw new UnprocessableEntityException('Invalid order id');
    }
    const orders = await this.orderService.getById(userId, parsed);
    return {
      isSuccess: true,
      orders,
    };
  }

  @Post()
  async create(
    @GetSession('userId') userId: number,
    @Body() body: CreateOrderDto
  ) {
    const order = await this.orderService.create(userId, body);
    return {
      isSuccess: true,
      order,
    };
  }
}
