import { queryOptions, useQuery } from '@tanstack/react-query';
import { UserService } from '~/services/user.service';

export const userQuery = queryOptions({
  queryFn: UserService.info,
  queryKey: ['user'],
});

export const useUser = () => {
  const { data } = useQuery(userQuery);
};
