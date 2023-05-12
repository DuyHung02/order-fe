import {BillDto} from "../../../../dtos/BillDto";
import {CartDto} from "../../../cart/dtos/CartDto";
import {OrderDetailDto} from "./OrderDetailDto";
import {UserDto} from "../../../user/userDto/userDto";

export class OrderDto {
  id?: number;
  status?: string;
  total_product?: string;
  total_price?: string;
  create_at?: Date;
  complete_at?: Date;
  user?: UserDto;
  order_details?: OrderDetailDto[];

  constructor(id: number, status: string, total_product: string, total_price: string, create_at: Date, complete_at: Date, user: UserDto, order_details: OrderDetailDto[]) {
    this.id = id;
    this.status = status;
    this.total_product = total_product;
    this.total_price = total_price;
    this.create_at = create_at;
    this.complete_at = complete_at;
    this.user = user;
    this.order_details = order_details;
  }
}
