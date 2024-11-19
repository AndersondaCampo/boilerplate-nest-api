import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserToken } from '../../shared/user-token';
import { OrganizationsService } from 'src/domain/organization/organizations.service';

@Injectable()
export class ManagerMembersGuard implements CanActivate {
  constructor(
    private readonly organizationService: OrganizationsService,
  ) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const user: UserToken = request['user'];

    const organizationId = request.params['id'];

    if (!organizationId) {
      return false;
    }

    const organization = await this.organizationService.findById({ id: organizationId });
    if (!organization) {
      return false;
    }

    const member = organization.members.find(m => m.userId === user.id && (m.role === 'manager' || m.isOwner));

    if (!member) {
      throw new UnauthorizedException('You do not have permission to access this resource');
    }
  }
}