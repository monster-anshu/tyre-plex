import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'sql-main')
    private userRepository: Repository<User>
  ) {}

  getById(id: number) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  getByEmail(email: string) {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async add(user: Pick<User, 'email'>) {
    const data = this.userRepository.create(user);
    await data.save();
    return data;
  }
}
