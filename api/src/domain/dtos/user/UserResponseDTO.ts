import { User } from "../../models/User";

export class UserResponseDTO {
  id: string;
  email: string;
  name?: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
  }
}