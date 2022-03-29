import { IsInt, IsPositive, IsString, IsDate, IsArray, IsOptional } from "class-validator";
import { Comments } from "./comments.dto";

export class CreatePost {

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  text!: string;

  @IsArray()
  @IsOptional()
  comments!: Comments[];

}

export class Posts extends CreatePost{
  @IsInt()
  @IsPositive()
  id!: number;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;

}
