import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../shared/base-entity";
import { OrganizationMember } from "./organization-members.entity";

@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => OrganizationMember, member => member.organization)
  members: OrganizationMember[];
}