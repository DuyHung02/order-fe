import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "./dtos/ProductDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(product: ProductDto, image: string, is_active: boolean, categoryId: number): Observable<ProductDto> {
    product.image = image
    product.is_active = is_active
    product.categoryId = categoryId
    return this.http.post<ProductDto>('http://localhost:3000/products/create', product)
  }

  updateProduct(product: ProductDto, image: string | undefined, is_active: boolean): Observable<ProductDto> {
    product.image = image
    product.is_active = is_active
    product.categoryId = Number(product.category)
    return this.http.post<ProductDto>('http://localhost:3000/products/update', product)
  }

  getAllProduct(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('http://localhost:3000/products/find/all')
  }

  getProductsActiveOn(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('http://localhost:3000/products/find/all/active/on')
  }

  getProductsActiveOff(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('http://localhost:3000/products/find/all/active/off')
  }

  getProductByCategory(id: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`http://localhost:3000/products/find/by/category/${id}`)
  }

  getProductById(productId: number | undefined): Observable<ProductDto> {
    return this.http.get<ProductDto>(`http://localhost:3000/products/find/${productId}`)
  }
}
