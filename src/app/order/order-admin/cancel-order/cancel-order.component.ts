import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderDto} from "../orderDtos/OrderDto";
import {OrderService} from "../../order-service/order.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit{

  constructor(private orderService: OrderService, private modalService: NgbModal) {
  }
  @ViewChild('reasonModal') reasonModal: any;
  orders: OrderDto[] | undefined = []
  reasonCancel: string | undefined = ''

  async ngOnInit() {
    this.orders = await this.orderService.getCancelOrder().toPromise()
  }

  openReasonModal(reasonCancel: string | undefined) {
    this.reasonCancel = reasonCancel
    this.modalService.open(this.reasonModal)
  }

  hideModal() {
    this.modalService.dismissAll()
  }
}
