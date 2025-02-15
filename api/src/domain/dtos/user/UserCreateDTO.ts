import { IsEmail, IsOptional, IsString } from "class-validator";

export class UserCreateDTO {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  name?: string;
}