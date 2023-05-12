import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderDto} from "../order-admin/orderDtos/OrderDto";
import {BillDto} from "../../../dtos/BillDto";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  getAllOrder(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>('http://localhost:3000/orders')
  }

  getNewOrder(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>('http://localhost:3000/orders/news')
  }

  getOrderWaiting(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>('http://localhost:3000/orders/waiting')
  }

  getOrderDone(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>('http://localhost:3000/orders/done')
  }

  getCancelOrder(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>('http://localhost:3000/orders/cancel')
  }

  getOrderDetail(orderId: number | undefined): Observable<OrderDto> {
    const orderUser = {orderId}
    return this.http.post<OrderDto>(`http://localhost:3000/orders/detail`, orderUser)
  }

  getUserOrder(userId: number | undefined) : Observable<OrderDto[]> {
    const id = {userId: userId}
    return this.http.post<OrderDto[]>('http://localhost:3000/orders/user', id)
  }

  getUserNewOrder(userId: number | undefined | null) : Observable<OrderDto[]> {
    const id = {userId: userId}
    return this.http.post<OrderDto[]>('http://localhost:3000/orders/user/news', id)
  }

  getUserOrderWaiting(userId: number | undefined | null) : Observable<OrderDto[]> {
    const id = {userId: userId}
    return this.http.post<OrderDto[]>('http://localhost:3000/orders/user/waiting', id)
  }

  getUserOrderDone(userId: number | undefined | null) : Observable<OrderDto[]> {
    const id = {userId: userId}
    return this.http.post<OrderDto[]>('http://localhost:3000/orders/user/done', id)
  }

  getUserCancelOrder(userId: number | undefined | null) : Observable<OrderDto[]> {
    const id = {userId: userId}
    return this.http.post<OrderDto[]>('http://localhost:3000/orders/user/cancel', id)
  }

  confirmOrder(orderId: number | undefined | null, userId: number | undefined | null): Observable<OrderDto[]> {
    const orderUser = {orderId, userId}
    return this.http.post<OrderDto[]>(`http://localhost:3000/orders/confirm`, orderUser)
  }

  cancelOrder(orderId: number | undefined | null, userId: number | undefined | null): Observable<OrderDto[]> {
    const orderUser = {orderId, userId}
    return this.http.post<OrderDto[]>(`http://localhost:3000/orders/cancel`, orderUser)
  }

}
