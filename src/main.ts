import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.enableCors({
    origin: 'https://enid.pk',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    Credential: true,
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
