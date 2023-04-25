import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  @ViewChild('falsePassword') falsePasswordModal: any;

  constructor(private authService: AuthService, private router: Router,
              private modalService: NgbModal) {
  }
  email: any
  formPassword: FormGroup = new FormGroup({
    password: new FormControl(),
    confirmPassword: new FormControl(),
  })
  ngOnInit(): void {
    this.email = localStorage.getItem('email')
    console.log(this.email)
  }

  checkPassword() {
    const password = this.formPassword.value.password + ''
    const confirmPassword = this.formPassword.value.confirmPassword + ''
    if (password == confirmPassword) {
      this.createUser(password)
    } else {
      this.modalService.open(this.falsePasswordModal);
    }
  }
  createUser(password: string) {
    this.authService.createUser(this.email, password).subscribe(data => {
      localStorage.setItem("token", data.token + "")
      localStorage.setItem("userDto", JSON.stringify(data))
      this.router.navigate(['/update/profile'])
    })
  }
  hideSuccessModal() {
    this.modalService.dismissAll();
  }


}
