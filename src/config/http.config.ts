import { registerAs } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';

export const httpConfig = registerAs(
  'http',
  (): AxiosRequestConfig => ({
    timeout: 5000,
    maxRedirects: 5,
  }),
);
