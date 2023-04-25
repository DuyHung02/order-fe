import {Component} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent {

  constructor(private authService: AuthService) {
  }

}
