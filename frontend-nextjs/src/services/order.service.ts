import { client } from './client';

export class OrderService {
  static async list() {
    const { data } = await client.get<ListResponse>('order');
    return data;
  }

  static async create(amount: number) {
    const { data } = await client.post<CreateResponse>('order', { amount });
    return data.order;
  }
}

type Order = {
  id: number;
  userId: number;
  amount: string | number;
  createdAt: string;
};

type ListResponse = {
  orders: Order[];
  isSuccess: boolean;
};

type CreateResponse = {
  isSuccess: boolean;
  order: Order;
};
