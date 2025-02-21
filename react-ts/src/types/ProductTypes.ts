import { User } from "./UserTypes";

export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  stock: number;
  images: string[];
  reviews?: Review[];
  category?: Category;
}

export interface Review {
  id: number;
  reviewText: string;
  rating: number;
  reviewImages: string[];
  product: Product;
  user: User;
  timeCreated: string;
}

export interface Category {
  id: number;
  name: string;
  parentCategory: Category;
  products: Product[];
}
