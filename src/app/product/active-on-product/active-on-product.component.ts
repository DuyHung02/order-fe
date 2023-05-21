import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductDto} from "../dtos/ProductDto";

@Component({
  selector: 'app-active-on-product',
  templateUrl: './active-on-product.component.html',
  styleUrls: ['./active-on-product.component.css']
})
export class ActiveOnProductComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  @ViewChild('productModal') productModal: any;

  products: ProductDto[] | undefined = []

  async ngOnInit() {
    this.products = await this.productService.getProductsActiveOn().toPromise()
  }
}
