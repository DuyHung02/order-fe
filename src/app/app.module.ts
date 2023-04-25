import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CheckMailComponent } from './auth/sign-up/check-mail/check-mail.component';
import { CheckOtpComponent } from './auth/sign-up/check-otp/check-otp.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { HomeIndexComponent } from './home/home-index/home-index.component';
import {AddTokenInterceptor} from "./auth/token/add-token.interceptor";
import { NavComponent } from './home/nav/nav.component';
import { HomeComponent } from './home/home/home.component';
import { ShowProfileComponent } from './profile/show-profile/show-profile.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { CheckOtpChangePasswordComponent } from './auth/change-password/check-otp-change-password/check-otp-change-password.component';
import { CheckMailChangePasswordComponent } from './auth/change-password/check-mail-change-password/check-mail-change-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CheckMailForgotPassComponent } from './auth/forgot-password/check-mail-forgot-pass/check-mail-forgot-pass.component';
import { CheckOtpForgotPassComponent } from './auth/forgot-password/check-otp-forgot-pass/check-otp-forgot-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    CheckMailComponent,
    CheckOtpComponent,
    UpdateProfileComponent,
    SignInComponent,
    HomeIndexComponent,
    NavComponent,
    HomeComponent,
    ShowProfileComponent,
    ChangePasswordComponent,
    CheckOtpChangePasswordComponent,
    CheckMailChangePasswordComponent,
    ForgotPasswordComponent,
    CheckMailForgotPassComponent,
    CheckOtpForgotPassComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
