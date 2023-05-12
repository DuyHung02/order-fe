import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryDto} from "./dtos/CategoryDto";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>('http://localhost:3000/categories/find/all')
  }

  createCategory(name: string, image: string): Observable<CategoryDto[]> {
    const createCategory = {name: name, image: image}
    return this.http.post<CategoryDto[]>('http://localhost:3000/categories/create', createCategory)
  }
}
