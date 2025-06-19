import { IsOptional, IsBoolean } from 'class-validator';

export class UpdatePermissionsDto {
  @IsOptional()
  @IsBoolean()
  canManageUsers?: boolean;
}
