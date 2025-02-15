import { Newsletter } from "../../models/Newsletter";

export class NewsletterResponseDTO {
    id: string;
    title: string;
    content: string;
  
    constructor(newsletter: Newsletter) {
      this.id = newsletter.id;
      this.title = newsletter.title;
      this.content = newsletter.content;
    }
  }