import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePlanningDto {
  @IsNotEmpty()
  @IsString()
  imageData: string; // Base64 encoded image

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;
}

