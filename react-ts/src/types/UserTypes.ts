export interface User {
  id: number;
  email: string;
  fullName?: string;
  mobile?: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
  addresses?: Address[];
  workouts?: Workout[];
  orders?: Order[];
  cart?: Cart;
  wishList?: WishList;
  workoutWatchList?: WorkoutWatchList;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  zip: string;
  user: User;
}

export interface Workout {
  id: number;
}

export interface Order {
  id: number;
}

export interface Cart {
  id: number;
}

export interface WishList {
  id: number;
}

export interface WorkoutWatchList {
  id: number;
}
