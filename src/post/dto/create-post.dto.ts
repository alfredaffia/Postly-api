import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'The title must be a string.' })
  @MinLength(3, { message: 'The title must be at least 3 characters long.' })
  title: string;

  @IsString({ message: 'The content must be a string.' })
  @MinLength(10, { message: 'The content must be at least 10 characters long.' })
  content: string;
}