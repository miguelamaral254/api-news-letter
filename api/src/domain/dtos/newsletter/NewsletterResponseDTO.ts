import { NewsletterStatus } from "../../enums/NewsletterStatus";
import { Newsletter } from "../../models/Newsletter";
export class NewsletterResponseDTO {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  subjectLine?: string;
  slug?: string;
  thumbnailUrl?: string;
  webUrl?: string;
  status: NewsletterStatus;
  publishDate?: Date;
  audience?: string;
  contentTags?: string[];

  constructor(newsletter: Newsletter) {
    this.id = newsletter.id;
    this.title = newsletter.title;
    this.subtitle = newsletter.subtitle;
    this.content = newsletter.content;
    this.subjectLine = newsletter.subjectLine;
    this.slug = newsletter.slug;
    this.thumbnailUrl = newsletter.thumbnailUrl;
    this.webUrl = newsletter.webUrl;
    this.status = newsletter.status as NewsletterStatus;
    this.publishDate = newsletter.publishDate;
    this.audience = newsletter.audience;
    this.contentTags = newsletter.contentTags;
  }
}