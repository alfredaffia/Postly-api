import { IsNotEmpty, IsOptional, IsMongoId, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsMongoId()
  @IsNotEmpty()
  post: string;

  @IsMongoId()
  @IsOptional()
  replyTo?: string;
}
