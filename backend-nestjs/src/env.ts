import 'dotenv/config';
export const REDIS_CACHE_HOST = process.env.REDIS_CACHE_HOST as string;
export const REDIS_CACHE_PORT = +(process.env.REDIS_CACHE_PORT || '');
export const REDIS_CACHE_USERNAME = process.env.REDIS_CACHE_USERNAME as string;
export const REDIS_CACHE_PASSWORD = process.env.REDIS_CACHE_PASSWORD as string;
