import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "../user/userDto/userDto";
import {TokenDto} from "./dtos/TokenDto";
import {UserService} from "../user/user.service";
import {RoleDto} from "../user/userDto/RoleDto";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private userService: UserService) { }

  checkEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/auth/check/${email}`)
  }

  checkEmailUser(id: number, email: string): Observable<boolean> {
    const user = {id, email}
    return this.http.post<boolean>('http://localhost:3000/users/check/email', user)
  }

  checkOtpRegister(email: string | undefined, confirmOtp: number): Observable<boolean> {
    const authOtp = {email, confirmOtp, typeCode: 'register'}
    return this.http.post<boolean>('http://localhost:3000/auth/check/otp', authOtp)
  }

  checkOtpChangePassword(email: string, confirmOtp: number): Observable<boolean> {
    const authOtp = {email, confirmOtp, typeCode: 'changePassword'}
    return this.http.post<boolean>('http://localhost:3000/users/check/otp/change/password', authOtp)
  }

  findUserByEmail(email: string): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/auth/find/user/${email}`)
  }

  sendOtp(email: string | undefined): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/auth/send/otp/${email}`)
  }

  sendOtpChangePassword(email: string): Observable<number> {
    return this.http.get<number>(`http://localhost:3000/users/send/otp/${email}`)
  }

  createUser(email: string, password: string): Observable<TokenDto> {
    const user = {email, password}
    return this.http.post<TokenDto>('http://localhost:3000/auth/register', user)
  }

  login(user: UserDto): Observable<TokenDto> {
    return this.http.post<TokenDto>('http://localhost:3000/auth/login', user)
  }

  changePassword(id: number, email: string, password: string, code: string): Observable<boolean> {
    const user = {id, email, password, code, typeCode: 'changePassword'}
    return this.http.post<boolean>(`http://localhost:3000/users/change/password`, user)
  }

  test(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/auth/user')
  }

  async isAdmin(): Promise<boolean> {
    try {
      const user = await this.userService.findUserRole().toPromise();
      const roles = user?.roles
      console.log(roles)
      if (roles) {
        for (let i = 0; i < roles?.length; i++) {
          if (roles[i].name === 'admin')
            return true
        }
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
