import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-check-otp-forgot-pass',
  templateUrl: './check-otp-forgot-pass.component.html',
  styleUrls: ['./check-otp-forgot-pass.component.css']
})
export class CheckOtpForgotPassComponent implements OnInit{
  @ViewChild('falseOtp') falseOtpModal: any;
  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }
  email: any
  otp!: number
  ngOnInit(): void {
    this.email = JSON.stringify(localStorage.getItem('email'))
  }
  formOtp: FormGroup = new FormGroup({
    otp1: new FormControl(),
    otp2: new FormControl(),
    otp3: new FormControl(),
    otp4: new FormControl(),
  })

  sendOtp() {
    this.authService.sendOtp(this.email).subscribe(data => {
      this.otp = data
    })
  }

  checkOtp() {
    let otpValue = this.formOtp.value
    let otpSting = `${otpValue.otp1}${otpValue.otp2}${otpValue.otp3}${otpValue.otp4}`
    let confirmOtp = parseInt(otpSting)
    if (confirmOtp == this.otp) {
      this.router.navigate(['/forgot/password'])
    } else {
      this.modalService.open(this.falseOtpModal);
    }
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }
}
