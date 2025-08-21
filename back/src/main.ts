import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS.split(',').map((origin) =>
      origin.trim(),
    ),
    methods: ['POST', 'OPTIONS', 'GET'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'x-app-key'],
    exposedHeaders: ['Content-Length', 'Date'],
    maxAge: 600,
  });

  // Middleware pour ajouter des en-têtes de sécurité supplémentaires
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
