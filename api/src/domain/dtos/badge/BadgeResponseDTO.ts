import { Badge } from "../../models/Badge";

export class BadgeResponseDTO {
  id: string;
  name: string;
  description: string;
  awardedAt: Date;
  userId: string;

  constructor(badge: Badge) {
    this.id = badge.id;
    this.name = badge.name;
    this.description = badge.description;
    this.awardedAt = badge.awardedAt;
    this.userId = badge.user.id;
  }
}