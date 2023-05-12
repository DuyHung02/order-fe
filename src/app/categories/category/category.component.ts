import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../category.service";
import {CategoryDto} from "../dtos/CategoryDto";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  constructor(private categoryService: CategoryService) {
  }
  categories: CategoryDto[]= []

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data
    })
  }

}
