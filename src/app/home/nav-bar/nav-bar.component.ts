import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../user/userDto/userDto";
import {ProfileDto} from "../../profile/profileDto/profileDto";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  userDto: UserDto | undefined
  profileDto: ProfileDto | undefined
  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    // @ts-ignore
    this.profileDto = JSON.parse(localStorage.getItem('profileDto'))
  }

  logout() {
    localStorage.clear()
    location.replace('/')
  }

}
