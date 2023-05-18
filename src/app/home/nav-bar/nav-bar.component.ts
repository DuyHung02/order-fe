import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../user/userDto/userDto";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

  userDto: UserDto | undefined
  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
  }

  logout() {
    localStorage.clear()
    location.replace('/')
  }

}
