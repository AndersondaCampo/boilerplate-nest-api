import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/database/shared/base-repository';
import { OrganizationMember } from '../entities/organization-members.entity';

@Injectable()
export class OrganizationMemberRepository extends BaseRepository<OrganizationMember> {
  constructor(dataSource: DataSource) {
    super(OrganizationMember, dataSource);
  }
}