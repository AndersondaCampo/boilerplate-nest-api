import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ApplicationModule } from './application/application.module';

import { UsersModule } from './domain/users/users.module';

import { EmailModule } from './integrations/email/email.module';
import { StripeModule } from './integrations/stripe/stripe.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './infrastructure/database/database.module';
import typeorm from './infrastructure/database/config/typeorm';
import { SharedModule } from './domain/shared/shared.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ApplicationModule,

    // domain modules
    SharedModule,
    UsersModule,

    // integrations modules
    EmailModule,
    StripeModule,

    // infrastructure modules
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm')),
    }),
    DatabaseModule,

    // global modules
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '4h' },
      }),
      global: true,
    }),
    CqrsModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 100,
          attempts: 5,
          backoff: {
            type: 'exponential',
            delay: 5000,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
