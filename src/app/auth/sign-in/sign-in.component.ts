import {Component, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup} from "@angular/forms";
import {RoleDto} from "../../user/userDto/RoleDto";
import {UserService} from "../../user/user.service";
import {AuthService} from "../auth.service";
import {UserDto} from "../../user/userDto/userDto";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private modalService: NgbModal, private userService: UserService,
              private authService: AuthService) {}

  @ViewChild('falseModal') falseModal: any;
  messageModal!: string
  roles: RoleDto[] | undefined = []
  userDto: UserDto | undefined
  formLogin: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

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
            } else {
              location.replace('/')
            }
          }
        }
      })
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.falseModal)
    })
  }

  hideModal() {
    this.modalService.dismissAll()
  }

}
