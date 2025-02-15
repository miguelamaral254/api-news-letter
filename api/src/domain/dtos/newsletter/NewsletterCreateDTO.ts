import { IsString } from "class-validator";

export class NewsletterCreateDTO {
  @IsString()
  title!: string;

  @IsString()
  content!: string;
}