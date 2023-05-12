import {OrderDto} from "./OrderDto";
import {ProductDto} from "../../../product/dtos/ProductDto";

export class OrderDetailDto {
  id?: number;
  quantity?: number;
  total_price_Product?: number
  order?: OrderDto;
  product?: ProductDto;

  constructor(id: number, quantity: number, total_price_Product: number, order: OrderDto, product: ProductDto) {
    this.id = id;
    this.quantity = quantity;
    this.total_price_Product = total_price_Product;
    this.order = order;
    this.product = product;
  }
}
