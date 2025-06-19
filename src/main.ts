import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerglobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('M4 Backend Ecommerce')
    .setVersion('1.0.0')
    .setDescription('Documentacion de mi proyecto del modulo 4 de Henry')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  app.use(loggerglobal);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
