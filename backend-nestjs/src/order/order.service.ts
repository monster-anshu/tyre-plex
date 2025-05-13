import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { configuration } from '~/env';
import { KafkaService } from '~/kafka/kafka.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order, 'sql-main')
    private readonly orderRepository: Repository<Order>,
    private readonly kafkaService: KafkaService
  ) {}

  async getById(userId: number, id: number) {
    const order = await this.orderRepository.findOneBy({
      userId,
      id,
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async list(userId: number) {
    const orders = await this.orderRepository.findBy({
      userId: userId,
    });

    return orders;
  }

  async create(userId: number, { amount }: CreateOrderDto) {
    const order = this.orderRepository.create({
      amount: amount,
      userId: userId,
    });
    await order.save();
    await this.emitToKafka(order);

    return order;
  }

  private async emitToKafka(order: Order) {
    const result = await this.kafkaService.send({
      messages: [
        {
          value: Buffer.from(JSON.stringify(order)),
          key: order.id.toString(),
        },
      ],
      topic: configuration.KAFKA.ORDER_TOPIC,
    });
    return result;
  }
}
