import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { queryHandlers } from './queries';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Session } from './entities/session.entity';
import { VerificationToken } from './entities/verification-token.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Session]),
    TypeOrmModule.forFeature([VerificationToken]),
  ],
  providers: [
    UsersRepository,
    UsersService,
    ...queryHandlers
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
