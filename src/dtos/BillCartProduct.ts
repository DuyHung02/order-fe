import {BillDto} from "./BillDto";
import {ProductDto} from "../app/product/dtos/ProductDto";

export class BillCartProduct {
  id?: number;
  bill?: BillDto;
  product?: ProductDto;
  quantity?: number;

  constructor(id: number, bill: BillDto, product: ProductDto, quantity: number) {
    this.id = id;
    this.bill = bill;
    this.product = product;
    this.quantity = quantity;
  }
}
