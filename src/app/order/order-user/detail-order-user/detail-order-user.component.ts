import {Component, OnInit, ViewChild} from '@angular/core';
import {ShareDataService} from "../../../share-data/share-data.service";
import {OrderService} from "../../order-service/order.service";
import {OrderDto} from "../../order-admin/orderDtos/OrderDto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-detail-order-user',
  templateUrl: './detail-order-user.component.html',
  styleUrls: ['./detail-order-user.component.css']
})
export class DetailOrderUserComponent implements OnInit{
  constructor(private shareDateService: ShareDataService, private orderService: OrderService,
              private modalService: NgbModal) {
  }

  @ViewChild('falseModal') falseModal: any;
  messageModal!: string;

  orderId: number | undefined
  orderDto: OrderDto | undefined
  ngOnInit(): void {
    this.orderId = this.shareDateService.getOrderId()
    this.orderService.getOrderDetail(this.orderId).subscribe(data => {
      this.orderDto = data
    })
  }

}
