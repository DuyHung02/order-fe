import { Injectable } from '@angular/core';
import {UserDto} from "../user/userDto/userDto";
import {BehaviorSubject} from "rxjs";
import {ProductDto} from "../product/dtos/ProductDto";

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  constructor() { }

  orderId: number | undefined

  setOrderId(orderId: number | undefined) {
    this.orderId = orderId;
  }

  getOrderId() {
    return this.orderId
  }

}
