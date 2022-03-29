import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator";

export class UserInfo {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    userName!: string;

    @IsString()
    @IsEmail()
    userEmail!: string;


}