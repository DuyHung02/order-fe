import {Component, ViewChild} from '@angular/core';
import {AuthService} from "../../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProfileService} from "../../../profile/profile-service/profile.service";
import {CartService} from "../../../cart/cart-service/cart.service";
import {UserService} from "../../../user/user.service";
import {EmailValidator} from "./email.validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private authService: AuthService, private modalService: NgbModal,
              private profileService: ProfileService, private cartService: CartService,
              private userService: UserService) {
  }
  @ViewChild('falseModal') falseModal: any;

  messageModal!: string
  public buttonText = 'Gửi mã xác nhận';
  public counter = 60;
  public disabled = false;
  formEmail: boolean = true
  formOtp: boolean = false
  formPassword: boolean = false
  formCheckOtp: FormGroup = new FormGroup({
    otp: new FormControl(),
  })
  formCheckEmail: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required, EmailValidator.isValid])
  })
  formCheckPassword: FormGroup = new FormGroup({
    password: new FormControl(),
    confirmPassword: new FormControl()
  })
  email: string = ''

  async registerUser() {
    const password = this.formCheckPassword.value.password + ''
    const confirmPassword = this.formCheckPassword.value.confirmPassword + ''
     if (this.checkPassword(password, confirmPassword)) {
      const token = await this.authService.createUser(this.email, password).toPromise();
      await localStorage.setItem("token", token?.access_token + "")
      await this.profileService.createProfile().toPromise()
      await this.cartService.createCart().toPromise()
      const user = await this.userService.findUserById().toPromise();
      await localStorage.setItem('userDto', JSON.stringify(user))
       location.replace('/')
    } else {
      this.modalService.open(this.falseModal)
    }
  }

  async checkEmail() {
    this.email = this.formCheckEmail.value.email
      if (this.email.length == 0) {
      this.messageModal = 'Email không được trống'
      this.modalService.open(this.falseModal)
    }
    await this.authService.checkEmail(this.email).subscribe(() => {
      this.formEmail = false
      this.formOtp = true
      this.sendOtp()
      this.waitOtp()
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.falseModal)
    })
  }

  checkPassword(password: string, confirmPassword: string) {
    if (password.length > 8) {
      if (password === confirmPassword) {
        return true
      } else {
        this.messageModal = 'Mật khẩu nhập lại không đúng'
        return false
      }
    } else {
      this.messageModal = 'Mật khẩu phải lớn hơn 8 kí tự'
      return false
    }
  }

  async sendOtp() {
    await this.authService.sendOtp(this.email).toPromise()
  }

  checkOtp() {
    let otpValue = this.formCheckOtp.value.otp
    this.authService.checkOtpRegister(this.email, otpValue).subscribe(data => {
      this.formOtp = false
      this.formPassword = true
    }, error => {
      this.messageModal = error.error.message
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

  hideModal() {
    this.modalService.dismissAll()
  }
}
