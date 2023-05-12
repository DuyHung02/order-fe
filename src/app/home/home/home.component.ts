import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product/product.service";
import {CartProductsDto} from "../../cart/dtos/CartProductsDto";
import {CartDto} from "../../cart/dtos/CartDto";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private productService: ProductService) {
  }

  cartDto : CartDto | undefined

  addCartProducts(cartDto: CartDto) {
    this.cartDto = cartDto
  }

  ngOnInit(): void {
  }
}
