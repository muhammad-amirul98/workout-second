import { CartItemType } from "../../../types/CartTypes";

export const sumCartPrice = (cartItems: CartItemType[]) => {
  return cartItems.length > 0
    ? cartItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    : 0;
};
