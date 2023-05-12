import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../../user/userDto/userDto";
import {CartProductsDto} from "../dtos/CartProductsDto";
import {CartDto} from "../dtos/CartDto";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  createCart(id: number): Observable<UserDto> {
    const userId = {id: id}
    return this.http.post<UserDto>('http://localhost:3000/carts/create', userId)
  }

  addToCart(cartId: number | null | undefined, productId: number | null | undefined): Observable<CartDto> {
    const idCartProduct = {cartId, productId}
    return this.http.post<CartDto>('http://localhost:3000/carts/add/product', idCartProduct)
  }

  removeFromCart(cartId: number | null | undefined, productId: number | null | undefined): Observable<CartDto> {
    const idCartProduct = {cartId, productId}
    return this.http.post<CartDto>('http://localhost:3000/carts/delete/product', idCartProduct)
  }

  createOrder(userId: number | null | undefined, cartId: number | null | undefined): Observable<any> {
    const createOrderDto = {userId, cartId}
    return this.http.post<any>('http://localhost:3000/orders/create', createOrderDto)
  }

  getItemsCart(id: number | null | undefined): Observable<CartDto> {
    const cartId = {cartId: id}
    return this.http.post<CartDto>('http://localhost:3000/carts/get/products', cartId)
  }

  test() {
    return this.http.get('http://localhost:3000/auth/admin')
  }
}
