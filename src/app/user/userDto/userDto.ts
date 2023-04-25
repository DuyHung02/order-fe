import {ProfileDto} from "../../profile/profileDto/profileDto";

export class UserDto {
  id?: number;
  email?: string;
  role?: string
  profile?: ProfileDto
  token?: string

  constructor(id: number, email: string, role: string, profile: ProfileDto, token: string) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.profile = profile;
    this.token = token;
  }
}
