import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../user/userDto/userDto";
import {OrderService} from "../order-service/order.service";
import {OrderDto} from "../order-admin/orderDtos/OrderDto";
import {ShareDataService} from "../../share-data/share-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-user',
  templateUrl: './order-user.component.html',
  styleUrls: ['./order-user.component.css']
})
export class OrderUserComponent implements OnInit{
  constructor(private orderService: OrderService, private shareDataService: ShareDataService,
              private router: Router) {
  }
  userDto: UserDto | undefined
  userId: number | null | undefined
  orders: OrderDto[] | undefined
  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    this.userId = this.userDto?.id
    this.orderService.getUserNewOrder(this.userId).subscribe(data => {
      this.orders = data
    })
  }

  getUserNewOrder() {
    this.orderService.getUserNewOrder(this.userId).subscribe(data => {
      this.orders = data
    })
  }

  getUserOrderWaiting() {
    this.orderService.getUserOrderWaiting(this.userId).subscribe(data => {
      this.orders = data
    })
  }

  getUserOrderDone() {
    this.orderService.getUserOrderDone(this.userId).subscribe(data => {
      this.orders = data
    })
  }

  getUserCancelOrder() {
    this.orderService.getUserCancelOrder(this.userId).subscribe(data => {
      this.orders = data
    })
  }

  getUserOrderDetail(id: number | undefined) {
    this.shareDataService.setOrderId(id)
    this.router.navigate(['/user/order/detail'])
  }

}
