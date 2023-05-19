import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../order-service/order.service";
import {OrderDto} from "../orderDtos/OrderDto";

@Component({
  selector: 'app-done-order',
  templateUrl: './done-order.component.html',
  styleUrls: ['./done-order.component.css']
})
export class DoneOrderComponent implements OnInit{
  constructor(private orderService: OrderService) {
  }
  orders: OrderDto[] | undefined = []
  async ngOnInit() {
    this.orders = await this.orderService.getOrderDone().toPromise()
  }
}
