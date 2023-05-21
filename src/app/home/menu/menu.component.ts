import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ProductService} from "../../product/product.service";
import {ProductDto} from "../../product/dtos/ProductDto";
import {CartService} from "../../cart/cart-service/cart.service";
import {CartProductsDto} from "../../cart/dtos/CartProductsDto";
import {UserDto} from "../../user/userDto/userDto";
import {ShareDataService} from "../../share-data/share-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CartDto} from "../../cart/dtos/CartDto";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnChanges{
  constructor(private productService: ProductService, private cartService: CartService,
              private modalService: NgbModal) {
  }
  @Input() products: ProductDto[] = []
  @Input() categoryName: string | undefined
  @Output() cartDto: EventEmitter<CartDto> = new EventEmitter<CartDto>()

  @ViewChild('messModal') messModal: any;
  user: UserDto | undefined
  cartId!: number | null | undefined
  messageModal!: string

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(localStorage.getItem('userDto'))
    this.cartId = this.user?.cart?.id
    this.productService.getAllProduct().subscribe(data => {
      this.products = data;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  addToCart(productId: number | null | undefined) {
    this.cartService.addToCart(productId).subscribe(data => {
      this.cartDto.emit(data)
    }, error => {
      this.messageModal = error.error.message
      this.modalService.open(this.messModal)
    })
  }

  hideModal() {
    this.modalService.dismissAll()
  }
}
