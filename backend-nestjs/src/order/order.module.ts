import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaModule } from '~/kafka/kafka.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order], 'sql-main'), KafkaModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
