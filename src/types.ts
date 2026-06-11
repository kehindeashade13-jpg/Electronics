export enum Category {
  Phones = "Phones",
  Laptops = "Laptops",
  Audio = "Audio",
  Accessories = "Accessories"
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
