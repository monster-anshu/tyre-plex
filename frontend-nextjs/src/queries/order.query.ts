import { queryOptions } from '@tanstack/react-query';
import { OrderService } from '~/services/order.service';

export const orderQuery = queryOptions({
  queryKey: ['order'],
  queryFn: OrderService.list,
});
