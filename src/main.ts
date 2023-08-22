import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import { setupSwagger } from './setup-swagger';
import { AppConfigService } from './shared/services/app-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      cors: true,
    },
  );

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(reflector),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  app.setGlobalPrefix('api');

  const configService = app.select(SharedModule).get(AppConfigService);

  const { port } = configService.appConfig;

  if (configService.documentationEnabled) {
    setupSwagger(app, port);
  }

  await app.listen(port);
}

bootstrap();
