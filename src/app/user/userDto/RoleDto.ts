import {UserDto} from "./userDto";

export class RoleDto {
  id?: number
  name?: string
  user?: UserDto

  constructor(id: number, name: string, user: UserDto) {
    this.id = id;
    this.name = name;
    this.user = user;
  }
}
