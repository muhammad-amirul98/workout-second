import { Cart } from "./CartTypes";

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

export interface Order {
  id: number;
}

export interface WishList {
  id: number;
}

export interface WorkoutWatchList {
  id: number;
}

export interface Workout {
  id: number;
}
