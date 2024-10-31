import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/infrastructure/database/shared/base-repository';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationRepository extends BaseRepository<Organization> {
  constructor(dataSource: DataSource) {
    super(Organization, dataSource);
  }
}