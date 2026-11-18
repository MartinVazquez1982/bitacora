import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  const port = Number(app.get(ConfigService).get('PORT') ?? 3001);
  await app.listen(port, '127.0.0.1');
}
await bootstrap();