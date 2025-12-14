import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsMongoId()
  labId: string;

  @IsString()
  name: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  openingTime?: string;

  @IsOptional()
  closingTime?: string;
}
