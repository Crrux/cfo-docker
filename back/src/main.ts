import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import * as process from 'node:process';
import { DataSource } from 'typeorm';
import { seedAdmin } from './auth/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(',').map((origin) =>
      origin.trim(),
    ),
    methods: ['POST', 'OPTIONS', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['Content-Length', 'Date'],
    allowedHeaders: ['Content-Type', 'x-app-key', 'Authorization'],
  });

  // Middleware pour ajouter des en-têtes de sécurité supplémentaires
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());

  // Seed admin user
  const dataSource = app.get(DataSource);
  await seedAdmin(dataSource);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
