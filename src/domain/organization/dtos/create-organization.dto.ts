import { IsBoolean, IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isActive: boolean;
}