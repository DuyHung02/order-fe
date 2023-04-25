import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserDto} from "../../user/userDto/userDto";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  @ViewChild('falsePassword') falsePasswordModal: any;
  @ViewChild('successPassword') successPasswordModal: any;

  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }

  user: UserDto | undefined
  userId: any
  email!: any
  code!: any
  messageModal!: string
  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem("userDto"))
    this.userId = this.user?.id
    this.email = this.user?.email
    // @ts-ignore
    this.code = JSON.parse(localStorage.getItem('otp'))
    console.log(this.code)
  }

  formPassword: FormGroup = new FormGroup({
    password: new FormControl(),
    confirmPassword: new FormControl(),
  })

  checkPassword() {
    const password = this.formPassword.value.password + ''
    const confirmPassword = this.formPassword.value.confirmPassword + ''
    if (password == confirmPassword) {
      this.changePassword(password)
    } else {
      this.messageModal = 'Mật khẩu nhập lại không chính xác'
      this.modalService.open(this.falsePasswordModal);
    }
  }

  changePassword(password: string) {
    this.authService.changePassword(this.userId, this.email, password, this.code).subscribe(data => {
      if (data) {
        this.modalService.open(this.successPasswordModal);
      }
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.falsePasswordModal);
    })
  }

  goBack() {
    this.router.navigate(['/'])
  }

  hideSuccessModal() {
    this.modalService.dismissAll();
  }


}
