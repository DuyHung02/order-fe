import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.css']
})
export class CheckMailComponent {

  @ViewChild('emailAlreadyExist') emailModal: any;
  constructor(private authService: AuthService,
              private router: Router, private modalService: NgbModal) {
  }
  formEmail: FormGroup = new FormGroup({
    email: new FormControl()
  })

  checkEmail() {
    let email = this.formEmail.value.email
    this.authService.checkEmail(email).subscribe(data => {
      if (data) {
        this.modalService.open(this.emailModal);
      } else {
        localStorage.setItem("email", email)
        this.router.navigate(['/check/otp'])
      }
    })
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }
}
