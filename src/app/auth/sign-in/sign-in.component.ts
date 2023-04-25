import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {UserDto} from "../../user/userDto/userDto";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  @ViewChild('falseLogin') falseLoginModal: any;
  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }

  userDto: UserDto | undefined
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  login() {
    const user = this.formLogin.value
    this.authService.login(user).subscribe(data => {
      if (data) {
        localStorage.setItem("userDto", JSON.stringify(data))
        localStorage.setItem("token", data.token + "")
        location.replace('/')
      } else {
        this.modalService.open(this.falseLoginModal);
      }
    })
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }
}
