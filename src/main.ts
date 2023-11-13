import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';

async function bootstrap() {
  config.update({
    accessKeyId: process.env.CDN_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.CDN_BUCKET_SECRET_ACCESS_KEY,
    region: process.env.CDN_BUCKET_REGION,
  });
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
