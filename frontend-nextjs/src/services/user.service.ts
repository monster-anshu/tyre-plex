import { client } from './client';

export class UserService {
  static async info() {
    const { data } = await client.get<InfoResponse>('user/info');
    return data.user;
  }
}

type User = {
  id: number;
  email: string;
  createdAt: string;
};

type InfoResponse = {
  user: User;
};
