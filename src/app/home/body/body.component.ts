import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../product/product.service";
import {ProductDto} from "../../product/dtos/ProductDto";
import {UserService} from "../../user/user.service";
import {UserDto} from "../../user/userDto/userDto";
import {ProfileDto} from "../../profile/profileDto/profileDto";
import {CartService} from "../../cart/cart-service/cart.service";
import {CartDto} from "../../cart/dtos/CartDto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  constructor(private productService: ProductService, private userService: UserService,
              private cartService: CartService, private modalService: NgbModal) {
  }

  @ViewChild('checkoutModal') checkoutModal: any;
  @ViewChild('noteModal') noteModal: any;

  user: UserDto | undefined
  products: ProductDto[] | undefined = []
  profile: ProfileDto | undefined
  cart: CartDto | undefined
  messageModal!: string
  async ngOnInit() {
    this.products = await this.productService.getProductsActiveOn().toPromise()
    this.user = await this.userService.findUserById().toPromise()
    this.cart = await this.cartService.getCart().toPromise()
    this.profile = this.user?.profile
  }

  async addToCart(productId: number | undefined) {
    this.cartService.addToCart(productId).subscribe(cart => {
      this.cart = cart
    })
  }

  async removeFromCart(productId: number | undefined) {
    this.cartService.removeFromCart(productId).subscribe(cart => {
      this.cart = cart
    })
  }

  createOrder() {
    this.cartService.createOrder().subscribe(() => {
      this.messageModal = 'Đặt thành công'
      this.modalService.open(this.noteModal, {backdrop: 'static'})
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.noteModal)
    })
  }

  openCheckoutModal() {
    this.modalService.open(this.checkoutModal)
  }

  hideModal() {
    this.modalService.dismissAll()
  }
}
