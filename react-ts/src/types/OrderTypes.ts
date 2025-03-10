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
  paymentStatus: string;
  deliverDate: string;
}

export interface OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING", // Order has been placed but not yet processed
  PROCESSING = "PROCESSING", // Order is being prepared and packed
  SHIPPED = "SHIPPED", // Order has been shipped and is on its way
  DELIVERED = "DELIVERED", // Order has been successfully delivered
  CANCELLED = "CANCELLED", // Order was cancelled by the user or admin
  REFUNDED = "REFUNDED", // Order has been refunded to the user
  FAILED = "FAILED", // Payment failed, order not processed
  RETURN_REQUESTED = "RETURN_REQUESTED", // User has requested a return for the order
  RETURNED = "RETURNED", // Order has been returned and processed
}

export interface Transaction {
  id: number;
  order: Order;
  transactionId: string;
  paymentStatus: string;
  paymentGateway: string;
  createdAt: string;
}
