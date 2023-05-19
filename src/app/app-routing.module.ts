import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import {HomeAdminComponent} from "./home/home-admin/home-admin.component";
import {CreateProductComponent} from "./product/create-product/create-product.component";
import {EditProductComponent} from "./product/edit-product/edit-product.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order-admin/show-order/order.component";
import {DetailOrderComponent} from "./order/order-admin/detail-order/detail-order.component";
import {OrderUserComponent} from "./order/order-user/order-user.component";
import {DetailOrderUserComponent} from "./order/order-user/detail-order-user/detail-order-user.component";
import {AdminGuard} from "./auth/admin.guard";
import {UpdateCategoryComponent} from "./categories/category/update-category/update-category.component";
import {SignUpComponent} from "./auth/sign-up/sign-up/sign-up.component";
import {BodyComponent} from "./home/body/body.component";
import {ContentComponent} from "./home/content/content.component";
import {SignInComponent} from "./auth/sign-in/sign-in.component";
import {DepositComponent} from "./profile/deposit/deposit.component";
import {NewOrderComponent} from "./order/order-admin/new-order/new-order.component";
import {WaitingOrderComponent} from "./order/order-admin/waiting-order/waiting-order.component";
import {DoneOrderComponent} from "./order/order-admin/done-order/done-order.component";
import {CancelOrderComponent} from "./order/order-admin/cancel-order/cancel-order.component";

const routes: Routes = [
  {path: 'check/mail/password', component: CheckMailChangePasswordComponent},
  {path: 'check/mail/forgot/password', component: CheckMailForgotPassComponent},
  {path: 'check/otp/password', component: CheckOtpChangePasswordComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ShowProfileComponent},
  {path: 'deposit', component: DepositComponent},
  {path: 'change/password', component: ChangePasswordComponent},
  {path: 'check/otp/forgot/password', component: CheckOtpForgotPassComponent},
  {path: 'forgot/password', component: ForgotPasswordComponent},
  {path: 'create/product', component: CreateProductComponent},
  {path: 'edit/product/:id', component: EditProductComponent},
  {path: 'cart', component: CartComponent},
  {path: 'user/order/detail', component: DetailOrderUserComponent},
  {path: 'user/order', component: OrderUserComponent},
  {path: 'update/category', component: UpdateCategoryComponent},


  {path: 'register', component: SignUpComponent},
  {path: 'login', component: SignInComponent},
  {path: '', component: BodyComponent},
  {path: 'content', component: ContentComponent},
  {path: 'admin/orders', component: OrderComponent, canActivate: [AdminGuard]},
  {path: 'admin/orders/new', component: NewOrderComponent, canActivate: [AdminGuard]},
  {path: 'admin/orders/waiting', component: WaitingOrderComponent, canActivate: [AdminGuard]},
  {path: 'admin/orders/done', component: DoneOrderComponent, canActivate: [AdminGuard]},
  {path: 'admin/orders/cancel', component: CancelOrderComponent, canActivate: [AdminGuard]},
  {path: 'admin/order/detail', component: DetailOrderComponent, canActivate: [AdminGuard]},
  {path: 'admin/home', component: HomeAdminComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AdminGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
