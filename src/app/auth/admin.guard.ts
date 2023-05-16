import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }
  async canActivate(): Promise<boolean> {
    const isAdmin = await this.authService.isAdmin()
    if (isAdmin) {
      return true
    } else {
      await this.router.navigate(['/'])
      return false
    }
  }
}
