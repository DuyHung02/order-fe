import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-check-mail-forgot-pass',
  templateUrl: './check-mail-forgot-pass.component.html',
  styleUrls: ['./check-mail-forgot-pass.component.css']
})
export class CheckMailForgotPassComponent {
  @ViewChild('falseEmail') emailModal: any;
  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }

  formEmail: FormGroup = new FormGroup({
    email: new FormControl()
  })

  checkEmail() {
    const email = this.formEmail.value.email
    this.authService.checkEmail(email).subscribe(data => {
      if (data) {
        localStorage.setItem("email", email)
        this.router.navigate(['/check/otp/forgot/password'])
      } else {
        this.modalService.open(this.emailModal);
      }
    })
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }

}
