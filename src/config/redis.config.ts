import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs(
  'redis',
  (): RedisClientOptions => ({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASS,
    keyPrefix: process.env.REDIS_PREFIX || '',
  }),
);
