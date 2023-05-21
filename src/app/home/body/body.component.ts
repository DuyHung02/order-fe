import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product/product.service";
import {ProductDto} from "../../product/dtos/ProductDto";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  products: ProductDto[] | undefined = []
  async ngOnInit() {
    this.products = await this.productService.getProductsActiveOn().toPromise()
  }

}
