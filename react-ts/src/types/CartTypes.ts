import { Product } from "./ProductTypes";
import { User } from "./UserTypes";

export interface Cart {
  id?: number;
  user: User;
  cartItems?: CartItemType[];
  totalPrice: number;
}

export interface CartItemType {
  id?: number;
  product: Product;
  quantity: number;
  cart?: Cart;
}
