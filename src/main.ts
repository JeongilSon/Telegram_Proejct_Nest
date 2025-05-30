/**
 * 기존 .NET Core 프로젝트 대응 파일: Telegram_Project2_Web/Program.cs
 * 
 * 변경사항:
 * - var builder = WebApplication.CreateBuilder() → const app = await NestFactory.create()
 * - builder.Services.AddControllers() → 모듈 시스템으로 자동 처리
 * - builder.Services.AddSwaggerGen() → SwaggerModule.setup()
 * - builder.Services.AddDbContext() → DatabaseModule에서 처리
 * - app.UseCors() → app.enableCors()
 * - app.UseSwagger(), app.UseSwaggerUI() → SwaggerModule.setup()
 * - app.Run() → app.listen()
 * 
 * Nest.js 추가 기능:
 * - ValidationPipe: 자동 입력 검증
 * - Global Exception Filters: 에러 처리 자동화
 * - Dependency Injection: 더욱 체계적인 DI 시스템
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Telegram Project API')
    .setDescription('Telegram 프로젝트 REST API 문서')
    .setVersion('1.0')
    .addTag('users', '사용자 관리')
    .addTag('auth', '인증')
    .addTag('chat', '실시간 채팅')
    .addTag('bot', '봇 관리')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
