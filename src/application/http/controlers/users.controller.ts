import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthorizeGuard } from 'src/application/http/guards/authorize/authorize.guard';
import { Filter } from 'src/domain/shared/apply-filters';
import { UsersService } from 'src/domain/users/users.service';
import { User } from '../decorators/user.decorator';
import { UserToken } from '../shared/user-token';

@Controller('users')
@UseGuards(AuthorizeGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  findAll(@Query('filter') filter?: Filter) {
    return this.usersService.findAll(filter);
  }

  @Get('me')
  me(@User() user: UserToken) {
    return user;
  }
}
