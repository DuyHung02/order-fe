import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {ProductDto} from "../dtos/ProductDto";

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  @ViewChild('productModal') productModal: any;

  products: ProductDto[] | undefined = []

  async ngOnInit() {
    this.products = await this.productService.getAllProduct().toPromise()
  }
}
