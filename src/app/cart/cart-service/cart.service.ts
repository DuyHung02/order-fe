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

  createCart() {
    const cart = {}
    return this.http.post('http://localhost:3000/carts/create', cart)
  }

  addToCart(productId: number | null | undefined): Observable<CartDto> {
    const idCartProduct = {productId}
    return this.http.post<CartDto>('http://localhost:3000/carts/add/product', idCartProduct)
  }

  removeFromCart(productId: number | null | undefined): Observable<CartDto> {
    const idCartProduct = {productId}
    return this.http.post<CartDto>('http://localhost:3000/carts/delete/product', idCartProduct)
  }

  createOrder(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/orders/create')
  }

  getCart(): Observable<CartDto> {
    return this.http.get<CartDto>('http://localhost:3000/carts/get/cart')
  }

  test() {
    return this.http.get('http://localhost:3000/auth/admin')
  }
}
