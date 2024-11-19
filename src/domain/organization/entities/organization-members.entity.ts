import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Organization } from "./organization.entity";
import { BaseEntity } from "src/domain/shared/base-entity";
import { User } from "src/domain/users/entities/user.entity";

@Entity({ name: 'organization_members' })
export class OrganizationMember extends BaseEntity {
  @Column({ name: 'is_owner', default: false })
  isOwner: boolean;

  @Column({ name: 'role', nullable: true })
  role: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => Organization, organization => organization.members)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @OneToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}