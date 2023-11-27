import { Handler, Context, Callback } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import pino from 'pino';

import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestApplicationOptions } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let server: Handler;

async function bootstrapServer() {
  const logger = pino();

  const applicationOptions: NestApplicationOptions = {
    logger: {
      error: (message) => logger.error(message),
      log: (message) => logger.info(message),
      warn: (message) => logger.warn(message),
    },
    abortOnError: false,
    cors: true,
  };

  const app = await NestFactory.create(AppModule, applicationOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('User Service')
    .setDescription('User API')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrapServer());

  return server(event, context, callback);
};
