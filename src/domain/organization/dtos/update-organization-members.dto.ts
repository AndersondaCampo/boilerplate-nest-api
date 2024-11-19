import { IsObject, IsString } from "class-validator";

class OrganizationMember {
  @IsString()
  id: string;

  @IsString()
  role: string;
}

export class UpdateOrganizationMembers {
  @IsString()
  organizationId: string;

  @IsObject({ each: true })
  members: OrganizationMember[];
}