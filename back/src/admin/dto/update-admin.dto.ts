import { IsOptional, IsString, MinLength, IsBoolean } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
