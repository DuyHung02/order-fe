import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../user/userDto/userDto";
import {ProfileDto} from "../../profile/profileDto/profileDto";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userDto: UserDto | undefined
  profileDto: ProfileDto | undefined
  isAdmin: boolean = false

  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    // @ts-ignore
    this.profileDto = JSON.parse(localStorage.getItem('profileDto'))
    const roles = this.userDto?.roles
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          this.isAdmin = true
          break;
        }
      }
    }
  }

  logout() {
    localStorage.clear()
    location.replace('/')
  }

}
