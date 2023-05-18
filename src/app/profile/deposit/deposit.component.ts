import {Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../profile-service/profile.service";
import {UserService} from "../../user/user.service";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  constructor(private authService: AuthService, private modalService: NgbModal,
              private profileService: ProfileService, private userService: UserService) {
  }
  @ViewChild('falseModal') falseModal: any;

  messageModal!: string
  formDeposit: boolean = true
  formOtp: boolean = false
  deposit!: number

  public buttonText = 'Gửi mã xác nhận';
  public counter = 60;
  public disabled = false;
  formDepositInput: FormGroup = new FormGroup({
    balance: new FormControl()
  })
  formCheckOtp: FormGroup = new FormGroup({
    otp: new FormControl(),
  })

  getDeposit() {
    const depositValue = this.formDepositInput.value.balance
    if (depositValue < 10000) {
      this.messageModal = 'Nạp tối thiểu 10.000đ'
      this.modalService.open(this.falseModal)
    } else {
      this.sendOtp()
      this.deposit = depositValue
      this.formDeposit = false
      this.formOtp = true
    }
  }

  async sendOtp() {
    this.waitOtp()
    await this.authService.sendOtpDeposit().toPromise()
  }

  checkOtpDeposit() {
    const otpValue = this.formCheckOtp.value.otp
    this.authService.checkOtpDeposit(otpValue).subscribe(() => {
      this.saveDeposit()
      location.replace('/profile')
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.falseModal)
    })
  }

  saveDeposit() {
    this.profileService.saveDeposit(this.deposit).subscribe(() => {
    }, error => {
      this.messageModal = 'Nạp thất bại'
      this.modalService.open(this.falseModal)
    })
  }

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
}
