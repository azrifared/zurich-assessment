import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as env from 'env-var';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = env.get('PORT').default(3000).asInt();
const NODE_LOCAL_PORT = env.get('NODE_LOCAL_PORT').asInt();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Motor Insurance API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  await app.listen(PORT, () => {
    console.info(`App running on port ${PORT}`);
    if (NODE_LOCAL_PORT) {
      console.info(`Docker exposed on port ${NODE_LOCAL_PORT}`);
    }
  });
}
bootstrap();
