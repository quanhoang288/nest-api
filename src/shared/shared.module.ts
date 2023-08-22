import { RedisModule } from '@liaoliaots/nestjs-redis';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { ApiService } from './services/api.service';
import { AppConfigService } from './services/app-config.service';

const providers = [AppConfigService, ApiService];

@Global()
@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: (configService: AppConfigService) => configService.httpConfig,
      inject: [AppConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: AppConfigService) => ({
        config: configService.redisConfig,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers,
  exports: providers,
})
export class SharedModule {}
