import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../order-service/order.service";
import {OrderDto} from "../orderDtos/OrderDto";
import {FormControl, FormGroup} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-waiting-order',
  templateUrl: './waiting-order.component.html',
  styleUrls: ['./waiting-order.component.css']
})
export class WaitingOrderComponent implements OnInit{
  constructor(private orderService: OrderService, private modalService: NgbModal) {
  }
  @ViewChild('cancelModal') cancelModal: any;

  orders: OrderDto[] | undefined = []
  orderId: number | undefined = 0
  onOtherReason: boolean = false
  defaultReason = 'Đặt sai món'
  formCancelOrder: FormGroup = new FormGroup({
    reason: new FormControl(),
    otherReason: new FormControl()
  })

  async ngOnInit() {
    this.orders = await this.orderService.getOrderWaiting().toPromise()
  }
  confirmOrder(orderId: number | undefined) {
    this.orderService.confirmOrder(orderId).subscribe(data => {
      this.orders = data
    })
  }

  openOtherReason() {
    const reason = this.formCancelOrder.value.reason
    this.onOtherReason = reason == 'other';
  }

  cancelOrder() {
    let reason = this.formCancelOrder.value.reason
    if (reason == 'other') {
      reason = this.formCancelOrder.value.otherReason
    }
    this.orderService.cancelOrder(this.orderId, reason).subscribe(() => {
      this.hideModal()
      this.ngOnInit()
    })
  }

  openCancelModal(orderId: number | undefined) {
    this.orderId = orderId
    this.modalService.open(this.cancelModal)
  }

  hideModal() {
    this.modalService.dismissAll()
  }
}
