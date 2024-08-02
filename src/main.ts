import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import mongoose from 'mongoose';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  const uploadsPath = join(__dirname, '..', 'uploads');
  console.log('Serving static files from:', uploadsPath);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
    index: false,
  });
  mongoose.connection.on('connected', () => {
    Logger.log('Connected to MongoDB', 'MongoDBConnection');
  });
  mongoose.connection.on('error', (err) => {
    Logger.error('Error connecting to MongoDB', err, 'MongoDBConnection');
  });
  mongoose.connection.on('disconnected', () => {
    Logger.log('Disconnected from MongoDB', 'MongoDBConnection');
  });
  await app.listen(3000);
}
bootstrap();
