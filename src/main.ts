import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Prefiks (Hamma yo'llar /api bilan boshlanadi)
  app.setGlobalPrefix('api');

  // 2. Global Validation Pipe (DTO-larni tekshirish uchun)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO-da yo'q maydonlarni o'chirib tashlaydi
      forbidNonWhitelisted: true, // DTO-da yo'q maydon yuborilsa xato qaytaradi
      transform: true, // Kelgan ma'lumotni avtomatik DTO turiga o'giradi
    }),
  );

  // 3. Swagger Sozlamalari
  const config = new DocumentBuilder()
    .setTitle("CRM Najot Ta'lim")
    .setDescription("O'quv markazini boshqarish tizimi API hujjatlari")
    .setVersion('1.0')
    .addTag('Students')
    .addTag('Groups')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. CORS Sozlamalari (Frontend ulanishi uchun)
  app.enableCors();

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server http://localhost:${PORT}/api da yurgizildi`);
  console.log(`📖 Swagger hujjatlari: http://localhost:${PORT}/api/docs`);
}
void bootstrap();
