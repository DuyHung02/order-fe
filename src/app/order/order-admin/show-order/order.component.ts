import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../order-service/order.service";
import {OrderDto} from "../orderDtos/OrderDto";
import {Router} from "@angular/router";
import {ShareDataService} from "../../../share-data/share-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{

  constructor(private orderService: OrderService, private router: Router,
              private shareDataService: ShareDataService, private modalService: NgbModal) {
  }
  @ViewChild('cancelModal') cancelModal: any;
  @ViewChild('reasonModal') reasonModal: any;
  orders: OrderDto[] = []
  orderId: number | undefined = 0
  onOtherReason: boolean = false
  defaultReason = 'Đặt sai món'
  reasonCancel: string | undefined = ''
  formCancelOrder: FormGroup = new FormGroup({
    reason: new FormControl(),
    otherReason: new FormControl()
  })

  ngOnInit(): void {
    this.orderService.getAllOrder().subscribe(data => {
      this.orders = data
    })
  }

  openOtherReason() {
    const reason = this.formCancelOrder.value.reason
    this.onOtherReason = reason == 'other';
  }

  openReasonModal(reasonCancel: string | undefined) {
    this.reasonCancel = reasonCancel
    this.modalService.open(this.reasonModal)
  }

  confirmOrder(orderId: number | undefined) {
    this.orderService.confirmOrder(orderId).subscribe(() => {
      this.ngOnInit()
    })
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

  getUserOrderDetail(id: number | undefined) {
    this.shareDataService.setOrderId(id)
    this.router.navigate(['/admin/order/detail'])
  }

  hideModal() {
    this.modalService.dismissAll()
  }

}
