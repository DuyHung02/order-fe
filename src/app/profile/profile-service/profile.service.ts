import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProfileDto} from "../profileDto/profileDto";
import {Observable} from "rxjs";
import {UserDto} from "../../user/userDto/userDto";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  createProfile() {
    const profile = {}
    return this.http.post('http://localhost:3000/profiles/create', profile)
  }

  updateProfile(profile: ProfileDto, avatar: string): Observable<ProfileDto> {
    profile.avatar = avatar;
    return this.http.post<ProfileDto>('http://localhost:3000/profiles/update', profile)
  }

  saveDeposit(profileId: number | undefined, deposit: number): Observable<ProfileDto> {
    const depositProfile = {profileId, deposit}
    return this.http.post<ProfileDto>('http://localhost:3000/users/deposit', depositProfile)
  }

  findUserProfile(): Observable<UserDto> {
    return this.http.get<UserDto>('http://localhost:3000/profiles/find')
  }

  findUserById(id: number): Observable<ProfileDto> {
    return this.http.get(`http://localhost:3000/users/find/user/${id}`)
  }
}
