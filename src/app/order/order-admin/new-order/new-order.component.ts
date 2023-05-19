import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../order-service/order.service";
import {OrderDto} from "../orderDtos/OrderDto";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit{
  constructor(private orderService: OrderService) {
  }
  orders: OrderDto[] | undefined = []
  async ngOnInit() {
    this.orders = await this.orderService.getNewOrder().toPromise()
  }

  confirmOrder(orderId: number | undefined) {
    this.orderService.confirmOrder(orderId).subscribe(data => {
      this.orders = data
    })
  }

}
