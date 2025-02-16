import { IsString, IsOptional, IsEnum, IsArray, IsUrl, IsDate, IsISO8601 } from "class-validator";
import { NewsletterStatus } from "../../enums/NewsletterStatus";



export class NewsletterCreateDTO {
  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  content!: string;

  @IsString()
  @IsOptional()
  subjectLine?: string;

  @IsString()
  @IsOptional()
  slug?: string; 

  @IsString()
  @IsOptional()
  thumbnailUrl?: string; 

  @IsString()
  @IsOptional()
  webUrl?: string; 

  @IsEnum(NewsletterStatus)
  status: NewsletterStatus = NewsletterStatus.DRAFT;

  @IsDate()
  @IsISO8601()
  @IsOptional()
  publishDate?: Date; 

  @IsString()
  @IsOptional()
  audience?: string; 

  @IsArray()
  @IsOptional()
  contentTags?: string[]; 
}