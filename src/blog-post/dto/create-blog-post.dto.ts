import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsOptional()
  image?: string;
}
