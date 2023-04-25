import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../user/userDto/userDto";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  user: UserDto | undefined
  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("userDto"))
  }

  logout() {
    localStorage.clear()
  }

}
