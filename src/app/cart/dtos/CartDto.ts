import {CartProductsDto} from "./CartProductsDto";
import {UserDto} from "../../user/userDto/userDto";

export class CartDto {
  id?: number;
  total_price?: number;
  total_product?: number;
  cart_products?: CartProductsDto[];
  user?: UserDto;

  constructor(id: number, total_price: number, total_product: number, cart_products: CartProductsDto[], user: UserDto) {
    this.id = id;
    this.total_price = total_price;
    this.total_product = total_product;
    this.cart_products = cart_products;
    this.user = user;
  }
}
