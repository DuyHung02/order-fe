import {ProfileDto} from "../../profile/profileDto/profileDto";
import {CartProductsDto} from "../../cart/dtos/CartProductsDto";
import {RoleDto} from "./RoleDto";
import {CartDto} from "../../cart/dtos/CartDto";
import {OrderDto} from "../../order/order-admin/orderDtos/OrderDto";

export class UserDto {
  id?: number;
  email?: string;
  roles?: RoleDto[]
  profile?: ProfileDto
  cart?: CartDto
  order?: OrderDto[]

  constructor(id: number, email: string, roles: RoleDto[], profile: ProfileDto, cart: CartDto, order: OrderDto[]) {
    this.id = id;
    this.email = email;
    this.roles = roles;
    this.profile = profile;
    this.cart = cart;
    this.order = order;
  }
}
