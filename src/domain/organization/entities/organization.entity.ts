import { BaseEntity } from "src/domain/shared/base-entity";
import { AfterLoad, Column, Entity, OneToMany } from "typeorm";
import { OrganizationMember } from "./organization-members.entity";

@Entity({ name: 'organizations' })
export class Organization extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => OrganizationMember, member => member.organization, {
    cascade: true,
    eager: true,
  })
  members: OrganizationMember[];

  @AfterLoad()
  protected afterLoad() {
    this.members = this.members ?? [];
  }
}