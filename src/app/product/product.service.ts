import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDto} from "./dtos/ProductDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  createProduct(product: ProductDto, image: string): Observable<ProductDto> {
    product.image = image
    product.categoryId = Number(product.category)
    return this.http.post<ProductDto>('http://localhost:3000/products/create', product)
  }

  updateProduct(product: ProductDto, image: string | undefined): Observable<ProductDto> {
    product.image = image
    product.categoryId = Number(product.category)
    return this.http.post<ProductDto>('http://localhost:3000/products/update', product)
  }

  getAllProduct(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>('http://localhost:3000/products/find/all')
  }

  getProductByCategory(id: number): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`http://localhost:3000/products/find/by/category/${id}`)
  }

  getProductById(id: number | undefined): Observable<ProductDto> {
    return this.http.get(`http://localhost:3000/products/find/${id}`)
  }
}
