import { Product } from "./ProductTypes";
import { User } from "./UserTypes";

export interface WishList {
  id?: number;
  user?: User;
  products: Product[];
}
