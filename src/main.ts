import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Prefiks
  app.setGlobalPrefix('api');

  // 2. Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // 3. Swagger Sozlamalari (JWT Bearer auth qo'shildi)
  const config = new DocumentBuilder()
    .setTitle("CRM Najot Ta'lim")
    .setDescription("O'quv markazini boshqarish tizimi API hujjatlari")
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Students')
    .addTag('Groups')
    .addTag('Attendance')
    .addTag('Payments')
    .addTag('Leads')
    .addTag('Analytics')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. CORS Sozlamalari
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server http://localhost:${PORT}/api da yurgizildi`);
  console.log(`📖 Swagger hujjatlari: http://localhost:${PORT}/api/docs`);
}
void bootstrap();
