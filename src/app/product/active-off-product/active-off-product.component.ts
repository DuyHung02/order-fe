import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductDto} from "../dtos/ProductDto";

@Component({
  selector: 'app-active-off-product',
  templateUrl: './active-off-product.component.html',
  styleUrls: ['./active-off-product.component.css']
})
export class ActiveOffProductComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  @ViewChild('productModal') productModal: any;

  products: ProductDto[] | undefined = []

  async ngOnInit() {
    this.products = await this.productService.getProductsActiveOff().toPromise()
  }
}
