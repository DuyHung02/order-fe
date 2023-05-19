import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../order-service/order.service";
import {BillDto} from "../../../../dtos/BillDto";
import {ActivatedRoute} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDto} from "../../../user/userDto/userDto";
import {BillCartProduct} from "../../../../dtos/BillCartProduct";
import {OrderDto} from "../orderDtos/OrderDto";
import {ShareDataService} from "../../../share-data/share-data.service";

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css']
})
export class DetailOrderComponent implements OnInit{
  constructor(private orderService: OrderService, private route: ActivatedRoute,
              private modalService: NgbModal, private shareDataService: ShareDataService) {
  }

  @ViewChild('falseModal') falseModal: any;
  messageModal!: string;
  orderDto: OrderDto | undefined
  userDto: UserDto | undefined
  userId: number | undefined | null
  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    this.userId = this.userDto?.id
    const orderId = this.shareDataService.getOrderId()
    this.orderService.getOrderDetail(orderId).subscribe(data => {
      this.orderDto = data
    })
  }

  confirmOrder(orderId: number | undefined) {
    this.orderService.confirmOrder(orderId).subscribe(data => {
      this.orderService.getOrderDetail(orderId).subscribe(data => {
        this.orderDto = data
      })
    })
  }

  hideModal() {
    this.modalService.dismissAll()
  }
}
