import { Module } from '@nestjs/common';
import { AuthController } from './controlers/auth.controller';
import { UsersController } from './controlers/users.controller';
import { UsersModule } from 'src/domain/users/users.module';
import { ApplicationController } from './controlers/application.controller';

@Module({
  controllers: [
    ApplicationController,
    AuthController,
    UsersController,
  ],
  imports: [
    UsersModule
  ],
})
export class HttpModule { }
