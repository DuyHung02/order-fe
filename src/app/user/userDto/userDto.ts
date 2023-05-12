import {ProfileDto} from "../../profile/profileDto/profileDto";
import {CartProductsDto} from "../../cart/dtos/CartProductsDto";

export class UserDto {
  id?: number;
  email?: string;
  role?: string
  profile?: ProfileDto
  token?: string
  cart?: CartProductsDto

}
