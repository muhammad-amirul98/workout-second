import { Cart } from "./CartTypes";
import { Order } from "./OrderTypes";
import { WishList } from "./WishListTypes";

export interface User {
  id?: number;
  email: string;
  fullName?: string;
  mobile?: string;
  role?: UserRole;
  addresses?: Address[];
  workouts?: Workout[];
  orders?: Order[];
  cart?: Cart;
  wishList?: WishList;
  workoutWatchList?: WorkoutWatchList;
  profilePicture?: string;
}

export enum UserRole {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
}

export interface Address {
  id?: number;
  street: string;
  country: string;
  zip: string;
  user?: User;
}

export interface WorkoutWatchList {
  id: number;
}

export interface Workout {
  id: number;
}
