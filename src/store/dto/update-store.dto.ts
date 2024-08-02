import { IsString, IsOptional } from 'class-validator';

export class UpdateStoreDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly location?: string;
}
