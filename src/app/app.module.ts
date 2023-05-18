import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UpdateProfileComponent } from './profile/update-profile/update-profile.component';
import { HomeIndexComponent } from './home/home-index/home-index.component';
import {AddTokenInterceptor} from "./auth/token/add-token.interceptor";
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
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { MenuComponent } from './home/menu/menu.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order-admin/show-order/order.component';
import { DetailOrderComponent } from './order/order-admin/detail-order/detail-order.component';
import { OrderUserComponent } from './order/order-user/order-user.component';
import {CategoryComponent} from "./categories/category/category.component";
import { DetailOrderUserComponent } from './order/order-user/detail-order-user/detail-order-user.component';
import { UpdateCategoryComponent } from './categories/category/update-category/update-category.component';
import { SignUpComponent } from './auth/sign-up/sign-up/sign-up.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { BodyComponent } from './home/body/body.component';
import {CommonModule} from "@angular/common";
import { ContentComponent } from './home/content/content.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    UpdateProfileComponent,
    HomeIndexComponent,
    HomeComponent,
    ShowProfileComponent,
    ChangePasswordComponent,
    CheckOtpChangePasswordComponent,
    CheckMailChangePasswordComponent,
    ForgotPasswordComponent,
    CheckMailForgotPassComponent,
    CheckOtpForgotPassComponent,
    HomeAdminComponent,
    CreateProductComponent,
    EditProductComponent,
    MenuComponent,
    CartComponent,
    OrderComponent,
    DetailOrderComponent,
    OrderUserComponent,
    DetailOrderUserComponent,
    UpdateCategoryComponent,
    SignUpComponent,
    NavBarComponent,
    BodyComponent,
    ContentComponent,
    SignInComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddTokenInterceptor,
    multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
