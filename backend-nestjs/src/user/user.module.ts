import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User], 'sql-main')],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
