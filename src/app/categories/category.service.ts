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

  createCategory(category: CategoryDto, image: string): Observable<CategoryDto[]> {
    category.image = image
    return this.http.post<CategoryDto[]>('http://localhost:3000/categories/create', category)
  }

  updateCategory(category: CategoryDto, image: string | undefined): Observable<CategoryDto[]> {
    category.image = image
    return this.http.post<CategoryDto[]>('http://localhost:3000/categories/update', category)
  }

  findCategoryById(id: number | undefined): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`http://localhost:3000/categories/find/${id}`)
  }
}
