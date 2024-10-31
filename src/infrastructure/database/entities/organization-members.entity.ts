import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../shared/base-entity";
import { Organization } from "./organization.entity";


@Entity({ name: 'organization_members' })
export class OrganizationMember extends BaseEntity {
  @Column({ name: 'organization_id' })
  organizationId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'is_owner', default: false })
  isOwner: boolean;

  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @ManyToOne(() => Organization, organization => organization.members)
  organization: Organization;

  // @ManyToOne(() => User, user => user.organizations)
  // user: User;
}