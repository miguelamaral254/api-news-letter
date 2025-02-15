import { EntityRepository, Repository } from "typeorm";
import { Badge } from "../models/Badge";

@EntityRepository(Badge)
export class BadgeRepository extends Repository<Badge> {
  // Custom queries can go here
}