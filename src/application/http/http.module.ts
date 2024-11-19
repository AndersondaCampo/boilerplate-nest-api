import { Module } from '@nestjs/common';
import { AuthController } from './controlers/auth.controller';
import { UsersController } from './controlers/users.controller';
import { UsersModule } from 'src/domain/users/users.module';
import { ApplicationController } from './controlers/application.controller';
import { BullModule } from '@nestjs/bull';
import { OrganizationController } from './controlers/organization.controller';
import { OrganizationsModule } from 'src/domain/organization/organizations.module';

@Module({
  controllers: [
    ApplicationController,
    AuthController,
    UsersController,
    OrganizationController,
  ],
  imports: [
    BullModule.registerQueue({ name: 'auth' }),
    BullModule.registerQueue({ name: 'email' }),
    UsersModule,
    OrganizationsModule,
  ],
})
export class HttpModule { }
