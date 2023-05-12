import {UserDto} from "../app/user/userDto/userDto";
import {OrderDto} from "../app/order/order-admin/orderDtos/OrderDto";
import {BillCartProduct} from "./BillCartProduct";

export class BillDto {
  id?: number;
  totalPrice?: number;
  user?: UserDto;
  order?: OrderDto;
  bill_cart_product?: BillCartProduct[];

  constructor(id: number, totalPrice: number, user: UserDto, order: OrderDto, bill_cart_product: BillCartProduct[]) {
    this.id = id;
    this.totalPrice = totalPrice;
    this.user = user;
    this.order = order;
    this.bill_cart_product = bill_cart_product;
  }
}
