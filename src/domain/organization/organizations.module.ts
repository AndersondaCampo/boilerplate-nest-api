import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsService } from './organizations.service';
import { Organization } from './entities/organization.entity';
import { OrganizationRepository } from './organization.repository';
import { OrganizationMember } from './entities/organization-members.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    TypeOrmModule.forFeature([OrganizationMember]),
  ],
  providers: [
    OrganizationRepository,
    OrganizationsService,
  ],
  exports: [
    OrganizationsService
  ]
})
export class OrganizationsModule { }
