import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';
import { SessionMiddlewareFn } from './session/session.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1/tyre-plex');
  app.useGlobalPipes(new ZodValidationPipe());
  app.use(cookieParser());
  app.use(SessionMiddlewareFn);

  const config = new DocumentBuilder()
    .setTitle('Tyre Plex Order Service')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    useGlobalPrefix: true,
    jsonDocumentUrl: 'docs/swagger.json',
  });

  await app.listen(process.env.PORT ?? 3000);
}

patchNestJsSwagger();
bootstrap();
