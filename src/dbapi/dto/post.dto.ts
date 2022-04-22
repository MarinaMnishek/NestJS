import { CommentDTO } from './comment.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PostsDTO {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  text!: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  comments!: CommentDTO[];
}
