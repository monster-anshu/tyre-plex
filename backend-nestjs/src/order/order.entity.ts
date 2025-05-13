import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '~/user/user.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @CreateDateColumn()
  createdAt!: Date;
}
