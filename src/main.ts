import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Security middleware
  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: configService.get('CORS_ORIGIN')?.split(',') || [
        'http://localhost:3000',
      ],
      credentials: true,
    }),
  );

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Wisdom Works API')
    .setDescription('Grome Barbershop Booking Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    // .addTag('auth', 'Authentication endpoints')
    // .addTag('users', 'User management')
    // .addTag('barbers', 'Barber management')
    // .addTag('bookings', 'Booking management')
    // .addTag('payments', 'Payment processing')
    // .addTag('chat', 'Real-time chat')
    // .addTag('notifications', 'Notification system')
    // .addTag('admin', 'Admin operations')
    // .addTag('threads', 'Thread operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const port = configService.get('PORT') || 3000;
  await app.listen(port);

  logger.log(`🚀 Application is running on: http://localhost:${port}`);
  logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
