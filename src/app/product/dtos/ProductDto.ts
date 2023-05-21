import {CategoryDto} from "../../categories/dtos/CategoryDto";

export class ProductDto {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  amount?: number;
  category?: CategoryDto
  is_active?: boolean;
  categoryId?: number;
  quantity?: number;

  constructor(id: number, name: string, price: number, image: string, amount: number, category: CategoryDto, is_active: boolean, categoryId: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.amount = amount;
    this.category = category;
    this.is_active = is_active;
    this.categoryId = categoryId;
    this.quantity = quantity;
  }
}
