import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../product/product.service";
import {ProductDto} from "../../product/dtos/ProductDto";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit{
  constructor(private productService: ProductService) {
  }

  products: ProductDto[] = []
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe(data => {
      this.products = data
    })
  }

}
