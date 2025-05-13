import { Module, Provider } from '@nestjs/common';

import Redis from 'ioredis';
import { configuration } from 'src/env';

export const REDIS_PROVIDER_NAME = 'REDIS_CLIENT';
const REDIS_PROVIDER: Provider = {
  provide: REDIS_PROVIDER_NAME,
  useFactory: () => {
    return new Redis({
      host: configuration.REDIS.HOST,
      port: configuration.REDIS.PORT,
      username: configuration.REDIS.USERNAME,
      password: configuration.REDIS.PASSWORD,
    });
  },
};

@Module({
  providers: [REDIS_PROVIDER],
  exports: [REDIS_PROVIDER_NAME],
})
export class RedisModule {}
