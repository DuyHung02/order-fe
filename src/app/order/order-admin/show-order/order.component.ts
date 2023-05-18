import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../order-service/order.service";
import {OrderDto} from "../orderDtos/OrderDto";
import {Router} from "@angular/router";
import {ShareDataService} from "../../../share-data/share-data.service";
import {UserDto} from "../../../user/userDto/userDto";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  constructor(private orderService: OrderService, private router: Router,
              private shareDataService: ShareDataService) {
  }

  orders: OrderDto[] = []
  userDto: UserDto | undefined
  userId: number | undefined | null
  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    this.userId = this.userDto?.id
    this.orderService.getAllOrder().subscribe(data => {
      this.orders = data
      console.log(data)
    })
  }

  getNewOrder() {
    this.orderService.getNewOrder().subscribe(data => {
      this.orders = data
    })
  }

  getOrderWaiting() {
    this.orderService.getOrderWaiting().subscribe(data => {
      this.orders = data
    })
  }

  getOrderDone() {
    this.orderService.getOrderDone().subscribe(data => {
      this.orders = data
    })
  }

  getCancelOrder() {
    this.orderService.getCancelOrder().subscribe(data => {
      this.orders = data
    })
  }

  confirmOrder(orderId: number | undefined) {
    this.orderService.confirmOrder(orderId, this.userId).subscribe(data => {
      this.orders = data
    })
  }

  cancelOrder(orderId: number | undefined) {
    this.orderService.cancelOrder(orderId, this.userId).subscribe(data => {
      this.orders = data
    })
  }

  getUserOrderDetail(id: number | undefined) {
    this.shareDataService.setOrderId(id)
    this.router.navigate(['/admin/order/detail'])
  }

}
