import { Body, Controller, Delete, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AuthorizeGuard } from "../guards/authorize/authorize.guard";
import { OrganizationsService } from "src/domain/organization/organizations.service";
import { Filter } from "src/domain/shared/apply-filters";
import { CreateOrganizationDto } from "src/domain/organization/dtos/create-organization.dto";
import { UpdateOrganizationMembers } from "src/domain/organization/dtos/update-organization-members.dto";
import { ManagerMembersGuard } from "../guards/organization/manager-members.guard";
import { User } from "../decorators/user.decorator";
import { UserToken } from "../shared/user-token";

@Controller('organizations')
@UseGuards(AuthorizeGuard)
export class OrganizationController {
  constructor(
    private readonly service: OrganizationsService,
  ) { }

  @Get()
  findAll(@Query('filter') filter?: Filter) {
    return this.service.findAll(filter);
  }

  @Get(':id')
  findById(@Query('id') id: string) {
    return this.service.findById({ id });
  }

  @Post()
  create(@Body() dto: CreateOrganizationDto, @User() user: UserToken) {
    return this.service.create(user.id, dto);
  }

  @Post(':id/members')
  @UseGuards(ManagerMembersGuard)
  updateMembers(@Body() dto: UpdateOrganizationMembers) {
    return this.service.updateMembers(dto);
  }

  @Delete(':id')
  @UseGuards(ManagerMembersGuard)
  delete(@Query('id') id: string) {
    return this.service.delete({ id });
  }
}