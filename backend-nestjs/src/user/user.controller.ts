import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetSession } from '~/session/session.decorator';
import { UserGuard } from './user.guard';
import { UserService } from './user.service';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  async info(@GetSession('userId') userId: number) {
    const user = await this.userService.getById(userId);
    return {
      isSuccess: true,
      user,
    };
  }
}
