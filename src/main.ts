import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DatabaseService } from './infrastructure/database/database.service';
import fastifyCookie from '@fastify/cookie';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const databaseService = app.get(DatabaseService);
  await databaseService.runMigrations();
  await databaseService.runSeeds();

  app.enableCors();

  const configService = app.get(ConfigService);

  await app.register(fastifyCookie, {
    secret: configService.get<string>('COOKIE_SECRET'),
    hook: 'onRequest',
  });

  await app.listen({ port: 3001 }, () => {
    console.log('Server is running on http://localhost:3001');
  });
}
bootstrap();
