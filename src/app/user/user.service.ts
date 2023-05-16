import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "./userDto/userDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}
  findUserById(): Observable<UserDto> {
    return this.http.get<UserDto>('http://localhost:3000/users/find')
  }

  findUserRole(): Observable<UserDto> {
    return this.http.get<UserDto>('http://localhost:3000/users/find/role')
  }
}
