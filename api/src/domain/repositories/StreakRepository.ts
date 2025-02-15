import { EntityRepository, Repository } from "typeorm";
import { Streak } from "../models/Streak";

@EntityRepository(Streak)
export class StreakRepository extends Repository<Streak> {
  // Custom queries can go here
}