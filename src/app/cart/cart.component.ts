import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ShareDataService} from "../share-data/share-data.service";
import {ProductDto} from "../product/dtos/ProductDto";
import {CartService} from "./cart-service/cart.service";
import {UserDto} from "../user/userDto/userDto";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {CartDto} from "./dtos/CartDto";
import {CartProductsDto} from "./dtos/CartProductsDto";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges{

  constructor(private shareDataService: ShareDataService, private cartService: CartService,
              private modalService: NgbModal) {
  }

  @ViewChild('falseModal') falseModal: any;
  @ViewChild('successModal') successModal: any;
  @ViewChild('billModal') billModal: any;

  @Input() cartDto: CartDto | undefined
  userDto: UserDto | undefined
  userId: number | null | undefined
  cartId: number | null | undefined
  totalPrice: number = 0
  messageModal!: string
  ngOnInit(): void {
    // @ts-ignore
    this.userDto = JSON.parse(localStorage.getItem('userDto'))
    this.userId = this.userDto?.id
    this.cartId = this.userDto?.cart?.id
    this.cartService.getItemsCart(this.cartId).subscribe(data => {
      this.cartDto = data
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getProduct() {
    this.cartService.getItemsCart(this.cartId).subscribe(data => {
      this.cartDto = data;
    })
  }

  addToCart(productId: number | null | undefined) {
    this.cartService.addToCart(this.cartId, productId).subscribe(data => {
      this.cartDto = data
    })
  }

  openBillDetail() {
    this.modalService.open(this.billModal)
  }

  createOrder() {
    this.cartService.createOrder(this.userId, this.cartId).subscribe(data => {
      this.messageModal = 'Đặt thành công'
      this.modalService.open(this.successModal, {backdrop: 'static'})
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.falseModal)
    })
  }

  removeFromCart(productId: number | null | undefined) {
    this.cartService.removeFromCart(this.cartId, productId).subscribe(data => {
      this.cartDto = data
    })
  }

  reload() {
    location.reload()
  }

  hideModal() {
    this.modalService.dismissAll()
  }

  test() {
    this.cartService.test().subscribe(data => {})
  }

}
