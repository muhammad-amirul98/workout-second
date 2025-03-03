import { Product } from "./ProductTypes";
import { Address, User } from "./UserTypes";

export interface Order {
  id: number;
  user: User;
  orderItems: OrderItem[];
  orderDate: string;
  shippingAddress: Address;
  paymentDetails: unknown;
  totalItems: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  deliveryDate: string;
}

export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING", // Order has been created but not yet processed
  SHIPPED = "SHIPPED", // Order has been shipped to the customer
  DELIVERED = "DELIVERED", // Order has been delivered to the customer
  CANCELED = "CANCELED", // Order has been canceled
  RETURNED = "RETURNED", // Order has been returned by the customer
  COMPLETED = "COMPLETED", // Order has been successfully completed
  FAILED = "FAILED", // Order failed (e.g., payment failed, delivery issue)
}
