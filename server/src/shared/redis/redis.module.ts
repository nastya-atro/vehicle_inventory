import { Module } from '@nestjs/common';
import Redis from 'ioredis';

import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: new Redis({ port: 6379, host: 'localhost' }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
