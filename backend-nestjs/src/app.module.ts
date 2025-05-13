import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './env';
import { Order } from './order/order.entity';
import { OrderModule } from './order/order.module';
import { OtpModule } from './otp/otp.module';
import { RedisModule } from './redis/redis.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
        slaves: [
          {
            database: configuration.SQL.DB,
            host: configuration.SQL.HOST,
            password: configuration.SQL.PASSWORD,
            port: configuration.SQL.PORT,
            username: configuration.SQL.USERNAME,
          },
        ],
      },
      entities: [User, Order],
      connectTimeout: 3000,
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
