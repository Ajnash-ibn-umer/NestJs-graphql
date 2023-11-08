import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('test')
    .setDescription('all apis')
    .setVersion('1')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // const options: SwaggerDocumentOptions = {
  //   operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  // };
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
