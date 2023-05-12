import {ProductDto} from "../../product/dtos/ProductDto";
import {CartDto} from "./CartDto";

export class CartProductsDto {
  id?: number
  quantity?: number;
  total_price_product?: number
  cart?: CartDto;
  product?: ProductDto;

  constructor(id: number, quantity: number, total_price_product: number, cart: CartDto, product: ProductDto) {
    this.id = id;
    this.quantity = quantity;
    this.total_price_product = total_price_product;
    this.cart = cart;
    this.product = product;
  }
}
