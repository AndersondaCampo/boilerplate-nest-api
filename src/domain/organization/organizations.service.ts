import { Injectable, NotFoundException } from "@nestjs/common";
import { Filter } from "../shared/apply-filters";
import { OrganizationRepository } from "./organization.repository";
import { OrganizationMember } from "./entities/organization-members.entity";
import { CreateOrganizationDto } from "./dtos/create-organization.dto";
import { UpdateOrganizationMembers } from "./dtos/update-organization-members.dto";

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly repository: OrganizationRepository,
  ) { }

  async findAll(filter?: Filter) {
    return await this.repository.filterAll(filter);
  }

  async findById(dto: { id: string }) {
    const organization = await this.repository.findOneBy({ id: dto.id });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return organization;
  }

  async create(userId: string, dto: CreateOrganizationDto) {
    const organization = this.repository.create(dto);
    await this.repository.save(organization);

    const member = this.repository.manager.create(OrganizationMember, {
      organizationId: organization.id,
      userId,
      isOwner: true,
    });

    organization.members = [member];
    return organization;
  }

  async update(dto: { id: string; name: string, active: boolean }) {
    const organization = await this.findById({ id: dto.id });
    organization.name = dto.name;
    organization.isActive = dto.active;
    await this.repository.save(organization);
  }

  async updateMembers(dto: UpdateOrganizationMembers) {
    const organization = await this.findById({ id: dto.organizationId });

    const members = organization.members;
    dto.members.forEach(user => {
      const member = members.find(m => m.userId === user.id);
      if (member) {
        member.role = user.role;
      } else {
        const newMember = this.repository.manager.create(OrganizationMember, {
          organizationId: organization.id,
          userId: user.id,
          role: user.role,
        });
        members.push(newMember);
      }
    });

    await this.repository.save(organization);
  }

  async delete(dto: { id: string }) {
    const organization = await this.findById({ id: dto.id });
    await this.repository.delete({ id: organization.id });

    return organization;
  }
}