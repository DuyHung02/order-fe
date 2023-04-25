import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CheckMailComponent} from "./auth/sign-up/check-mail/check-mail.component";
import {CheckOtpComponent} from "./auth/sign-up/check-otp/check-otp.component";
import {SignUpComponent} from "./auth/sign-up/sign-up.component";
import {UpdateProfileComponent} from "./profile/update-profile/update-profile.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {HomeIndexComponent} from "./home/home-index/home-index.component";
import {HomeComponent} from "./home/home/home.component";
import {ShowProfileComponent} from "./profile/show-profile/show-profile.component";
import {ChangePasswordComponent} from "./auth/change-password/change-password.component";
import {CheckOtpChangePasswordComponent} from "./auth/change-password/check-otp-change-password/check-otp-change-password.component";
import {CheckMailChangePasswordComponent} from "./auth/change-password/check-mail-change-password/check-mail-change-password.component";
import {
  CheckOtpForgotPassComponent
} from "./auth/forgot-password/check-otp-forgot-pass/check-otp-forgot-pass.component";
import {
  CheckMailForgotPassComponent
} from "./auth/forgot-password/check-mail-forgot-pass/check-mail-forgot-pass.component";
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";

const routes: Routes = [
  {path: 'check/mail', component: CheckMailComponent},
  {path: 'check/mail/password', component: CheckMailChangePasswordComponent},
  {path: 'check/mail/forgot/password', component: CheckMailForgotPassComponent},
  {path: 'check/otp', component: CheckOtpComponent},
  {path: 'check/otp/password', component: CheckOtpChangePasswordComponent},
  {path: 'sign/up', component: SignUpComponent},
  {path: 'sign/in', component: SignInComponent},
  {path: 'update/profile', component: UpdateProfileComponent},
  {path: '', component: HomeComponent},
  {path: 'profile', component: ShowProfileComponent},
  {path: 'change/password', component: ChangePasswordComponent},
  {path: 'check/otp/forgot/password', component: CheckOtpForgotPassComponent},
  {path: 'forgot/password', component: ForgotPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
