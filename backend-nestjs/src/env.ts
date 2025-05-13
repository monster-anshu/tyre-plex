import 'dotenv/config';

export const configuration = {
  APPLICATION: {
    ENV: process.env.NODE_ENV,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET as string,
  },
  REDIS: {
    HOST: process.env.REDIS_CACHE_HOST as string,
    PASSWORD: process.env.REDIS_CACHE_PASSWORD as string,
    PORT: +(process.env.REDIS_CACHE_PORT || ''),
    USERNAME: process.env.REDIS_CACHE_USERNAME as string,
  },
  SQL: {
    DB: process.env.SQL_DB as string,
    HOST: process.env.SQL_HOST as string,
    PASSWORD: process.env.SQL_PASSWORD as string,
    PORT: Number(process.env.SQL_PORT),
    USERNAME: process.env.SQL_USERNAME as string,
  },
  KAFKA: {
    BROKERS: process.env.KAFKA_BROKERS?.split(',') || [],
    ORDER_TOPIC: process.env.KAFKA_ORDER_TOPIC as string,
  },
};
