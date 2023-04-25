import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDto} from "../../user/userDto/userDto";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('falsePassword') falsePasswordModal: any;
  @ViewChild('successPassword') successPasswordModal: any;

  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }

  user: any
  userId: any
  email!: any

  ngOnInit(): void {
    this.email = localStorage.getItem('email')
    this.authService.findUserByEmail(this.email).subscribe(data => {
      this.user = data
      localStorage.setItem("userDto", JSON.stringify(data))
      this.userId = this.user.id
    })
  }

  formPassword: FormGroup = new FormGroup({
    password: new FormControl(),
    confirmPassword: new FormControl(),
  })

  // checkPassword() {
  //   const password = this.formPassword.value.password + ''
  //   const confirmPassword = this.formPassword.value.confirmPassword + ''
  //   if (password == confirmPassword) {
  //     this.changePassword(password)
  //   } else {
  //     this.modalService.open(this.falsePasswordModal);
  //   }
  // }

  // changePassword(password: string) {
  //   this.authService.changePassword(this.userId, password).subscribe(data => {
  //     if (data) {
  //       this.modalService.open(this.successPasswordModal);
  //     } else {
  //       this.modalService.open(this.falsePasswordModal);
  //     }
  //   })
  // }

  goBack() {
    localStorage.clear()
    this.router.navigate(['/sign/in'])
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }

}
