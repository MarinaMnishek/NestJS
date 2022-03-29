import { IsInt, IsPositive, IsString, IsDate, IsArray, IsOptional, IsObject, IsNotEmptyObject, MinLength, IsNotEmpty, IsEmail } from "class-validator";
import { Comments } from "./comments.dto";
import { UserInfo } from "./user.dto";

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

  // @IsObject()
  // @IsNotEmptyObject()
  //  userInfo!: UserInfo;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  userName!: string;

  @IsString()
  @IsEmail()
  userEmail!: string;

}

export class Posts extends CreatePost {
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


