import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { isNil } from 'lodash';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get nodeEnv(): string {
    return this.getString('app.environment');
  }

  get documentationEnabled(): boolean {
    return this.getBoolean('app.enableDocumentation');
  }

  get port(): number {
    return this.getNumber('app.port');
  }

  get appConfig(): Record<string, unknown> {
    return {
      port: this.getNumber('app.port'),
      environent: this.getString('app.environment'),
      enableDocumentation: this.getBoolean('app.enableDocumentation'),
    };
  }

  get redisConfig(): RedisClientOptions {
    return this.configService.get<RedisClientOptions>('redis');
  }

  get httpConfig(): AxiosRequestConfig {
    return {
      timeout: this.getNumber('http.timeout'),
      maxRedirects: this.getNumber('http.maxRedirects'),
    };
  }

  public get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(`${key} environment variable does not set`);
    }

    return value;
  }

  public getNumber(key: string): number {
    const value = this.get(key);

    try {
      return Number(value);
    } catch {
      throw new Error(`${key} environment variable is not a number`);
    }
  }

  public getBoolean(key: string): boolean {
    const value = this.get(key);

    return value === 'true' || key === '1';
  }

  public getString(key: string): string {
    const value = this.get(key);

    return value?.replace(/\\n/g, '\n');
  }
}
