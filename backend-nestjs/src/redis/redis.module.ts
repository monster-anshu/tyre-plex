import { Module, Provider } from '@nestjs/common';

import Redis from 'ioredis';
import {
  REDIS_CACHE_HOST,
  REDIS_CACHE_PASSWORD,
  REDIS_CACHE_PORT,
  REDIS_CACHE_USERNAME,
} from 'src/env';

export const REDIS_PROVIDER_NAME = 'REDIS_CLIENT';
const REDIS_PROVIDER: Provider = {
  provide: REDIS_PROVIDER_NAME,
  useFactory: () => {
    return new Redis({
      host: REDIS_CACHE_HOST,
      port: REDIS_CACHE_PORT,
      username: REDIS_CACHE_USERNAME,
      password: REDIS_CACHE_PASSWORD,
    });
  },
};

@Module({
  providers: [REDIS_PROVIDER],
  exports: [REDIS_PROVIDER_NAME],
})
export class RedisModule {}
