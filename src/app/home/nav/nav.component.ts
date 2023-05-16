import {Component, OnInit, ViewChild} from '@angular/core';
import {UserDto} from "../../user/userDto/userDto";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {ProfileService} from "../../profile/profile-service/profile.service";
import {ShareDataService} from "../../share-data/share-data.service";
import {CartService} from "../../cart/cart-service/cart.service";
import {UserService} from "../../user/user.service";
import {RoleDto} from "../../user/userDto/RoleDto";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('LoginModal') loginModal: any;
  @ViewChild('falseModal') falseModal: any;
  @ViewChild('CheckMailModal') checkMailModal: any;
  @ViewChild('CheckOtpModal') checkOtpModal: any;
  @ViewChild('SignUpModal') signUpModal: any;

  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal, private profileService: ProfileService,
              private shareDataService: ShareDataService, private cartService: CartService,
              private userService: UserService) {
  }

  statusModal: boolean = true
  userDto: UserDto | undefined
  messageModal!: string
  email: any
  public buttonText = 'Gửi mã xác nhận';
  public counter = 60;
  public disabled = false;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })
  formEmail: FormGroup = new FormGroup({
    email: new FormControl()
  })
  formOtp: FormGroup = new FormGroup({
    otp1: new FormControl(),
    otp2: new FormControl(),
    otp3: new FormControl(),
    otp4: new FormControl(),
  })
  formPassword: FormGroup = new FormGroup({
    password: new FormControl(),
    confirmPassword: new FormControl(),
  })

  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    this.roles = this.userDto?.roles
    if (this.roles) {
      for (let i = 0; i < this.roles?.length; i++) {
        if (this.roles[i].name == 'admin') {
          this.isAdmin = true
          break
        }
      }
    }
  }

  openLoginModal() {
    this.modalService.open(this.loginModal)
  }

  openCheckMailModal() {
    this.modalService.open(this.checkMailModal)
  }

  checkEmail() {
    let email = this.formEmail.value.email
    this.authService.checkEmail(email).subscribe(user => {
      if (!user) {
        this.email = email
        this.modalService.open(this.checkOtpModal)
      }
    }, error => {
      this.messageModal = error.error.message
      this.statusModal = true
      this.modalService.open(this.falseModal);
    })
  }

  checkOtp() {
    let otpValue = this.formOtp.value
    let otpSting = `${otpValue.otp1}${otpValue.otp2}${otpValue.otp3}${otpValue.otp4}`
    let confirmOtp = parseInt(otpSting)
    this.authService.checkOtpRegister(this.email, confirmOtp).subscribe(data => {
      if (data) {
        this.hideModal()
        this.modalService.open(this.signUpModal)
      }
    }, error => {
      console.log(error)
      if (error.status == 410) {
        this.messageModal = error.error.message
        this.modalService.open(this.falseModal)
      }
      if (error.status == 400) {
        this.messageModal = error.error.message
        this.modalService.open(this.falseModal)
      }
    })
  }

  checkPassword() {
    const password = this.formPassword.value.password + ''
    const confirmPassword = this.formPassword.value.confirmPassword + ''
    if (password == confirmPassword) {
      this.createUser(password)
    } else {
      this.messageModal = 'Mật khẩu nhập lai không khớp'
      this.modalService.open(this.falseModal);
    }
  }

  async createUser(password: string) {
    await this.authService.createUser(this.email, password).subscribe(token => {
      localStorage.setItem("token", token.access_token + "")
    })
    await this.profileService.createProfile().subscribe(profile => {
    })
    await this.cartService.createCart().subscribe(cart => {
    })
    await this.userService.findUserById().subscribe(user => {
      localStorage.setItem('userDto', JSON.stringify(user))
      this.userDto = user
      this.hideModal()
    })
  }

  roles: RoleDto[] | undefined = []
  isAdmin: boolean = false

  async login() {
    const loginValue = this.formLogin.value
      await this.authService.login(loginValue).subscribe(token => {
        localStorage.setItem('token', token?.access_token + '')
        this.userService.findUserRole().subscribe(user => {
          this.userDto = user
          localStorage.setItem('userDto', JSON.stringify(user))
          this.roles = user?.roles
          if (this.roles) {
            for (let i = 0; i < this.roles?.length; i++) {
              if (this.roles[i].name === 'admin') {
                location.replace('home/admin')
                break;
              }
            }
          }
          this.hideModal()
        })
      }, error => {
        this.messageModal = error.error.message
        this.modalService.open(this.falseModal)
      })
  }

  logout() {
    localStorage.clear()
  }

  waitOtp() {
    this.disabled = true;
    const intervalId = setInterval(() => {
      this.counter--;
      this.buttonText = `(${this.counter}s)`;
      if (this.counter === 0) {
        clearInterval(intervalId);
        this.counter = 59;
        this.buttonText = 'Gửi lại mã xác nhận';
        this.disabled = false;
      }
    }, 1000);
  }

  sendOtp() {
    this.authService.sendOtp(this.email).subscribe(data => {
    })
  }

  hideModal() {
    this.modalService.dismissAll()
  }
}
