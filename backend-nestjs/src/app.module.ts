import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './env';
import { OtpModule } from './otp/otp.module';
import { RedisModule } from './redis/redis.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'sql-main',
      type: 'mysql',
      synchronize: true,
      replication: {
        master: {
          database: configuration.SQL.DB,
          host: configuration.SQL.HOST,
          password: configuration.SQL.PASSWORD,
          port: configuration.SQL.PORT,
          username: configuration.SQL.USERNAME,
        },
        slaves: [],
      },
      entities: [User],
      connectTimeout: 30000,
      subscribers: [],
      logging: configuration.APPLICATION.ENV != 'production',
    }),
    RedisModule,
    OtpModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
