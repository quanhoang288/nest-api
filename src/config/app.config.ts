import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  enableDocumentation: process.env.ENABLE_DOCUMENTATION,
}));
