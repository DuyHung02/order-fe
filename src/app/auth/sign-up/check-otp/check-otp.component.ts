import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-check-otp',
  templateUrl: './check-otp.component.html',
  styleUrls: ['./check-otp.component.css']
})
export class CheckOtpComponent implements OnInit {
  @ViewChild('otpModal') otpModal: any;

  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }

  email: any
  public buttonText = 'Gửi mã xác nhận';
  public counter = 60;
  public disabled = false;
  messageModal: any

  waitOtp() {
    this.disabled = true;
    const intervalId = setInterval(() => {
      this.counter--;
      this.buttonText = `(${this.counter}s)`;
      if (this.counter === 0) {
        clearInterval(intervalId);
        this.counter = 60;
        this.buttonText = 'Gửi lại mã xác nhận';
        this.disabled = false;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')
  }

  formOtp: FormGroup = new FormGroup({
    otp1: new FormControl(),
    otp2: new FormControl(),
    otp3: new FormControl(),
    otp4: new FormControl(),
  })

  sendOtp() {
    this.authService.sendOtp(this.email).subscribe(data => {
    })
  }

  checkOtp() {
    let otpValue = this.formOtp.value
    let otpSting = `${otpValue.otp1}${otpValue.otp2}${otpValue.otp3}${otpValue.otp4}`
    let confirmOtp = parseInt(otpSting)
    this.authService.checkOtpRegister(this.email, confirmOtp).subscribe(data => {
      if (data) {
        this.router.navigate(['/sign/up'])
      }
    }, error => {
      console.log(error)
      if (error.status == 410) {
        this.messageModal = error.error.message
        this.modalService.open(this.otpModal)
      }
      if (error.status == 400) {
        this.messageModal = error.error.message
        this.modalService.open(this.otpModal)
      }
    })
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }
}
