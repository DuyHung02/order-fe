import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileDto} from "../profileDto/profileDto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  createProfile(id: number, profile: ProfileDto, avatar: string): Observable<ProfileDto> {
    profile.avatar = avatar;
    return this.http.post<ProfileDto>(`http://localhost:3000/users/${id}/profile`, profile)
  }

  saveProfile(id: number, profile: ProfileDto, avatar: string): Observable<ProfileDto> {
    profile.avatar = avatar;
    return this.http.post<ProfileDto>(`http://localhost:3000/users/${id}/profile/update`, profile)
  }

  findUserById(id: number): Observable<ProfileDto> {
    return this.http.get(`http://localhost:3000/users/find/user/${id}`)
  }
}
