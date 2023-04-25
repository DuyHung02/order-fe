import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDto} from "../../../user/userDto/userDto";

@Component({
  selector: 'app-check-mail-change-password',
  templateUrl: './check-mail-change-password.component.html',
  styleUrls: ['./check-mail-change-password.component.css']
})
export class CheckMailChangePasswordComponent implements OnInit {

  @ViewChild('falseEmail') emailModal: any;

  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }

  user: UserDto | undefined
  userId: any

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('userDto'))
    this.userId = this.user?.id
  }

  formEmail: FormGroup = new FormGroup({
    email: new FormControl()
  })

  checkEmail() {
    const email = this.formEmail.value.email
    this.authService.checkEmailUser(this.userId, email).subscribe(data => {
      if (data)
        localStorage.setItem("email", email)
      this.router.navigate(['/check/otp/password'])
    }, error => {
      this.modalService.open(this.emailModal);
    })
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }

}
