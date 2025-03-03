import { Button, Divider } from "@mui/material";
import { Add, Close, Remove } from "@mui/icons-material";
import { CartItemType } from "../../../types/CartTypes";
import { useAppDispatch } from "../../../state/store";
import {
  removeItemFromCart,
  updateCartItemQuantity,
  UpdateItemRequest,
} from "../../../state/user/userCartSlice";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt");

  // const add = () => {
  //   if (jwt && cartItem.product.id) {
  //     dispatch(
  //       addItemToCart({
  //         jwt,
  //         productId: cartItem.product.id,
  //       })
  //     );
  //   }
  // };

  const updateQuantity = (quantity: number) => {
    if (jwt && cartItem.product.id) {
      const request: UpdateItemRequest = {
        productId: cartItem.product.id,
        quantity: quantity,
      };
      dispatch(
        updateCartItemQuantity({
          jwt,
          request,
        })
      );
    }
  };

  const remove = () => {
    if (jwt && cartItem.product.id) {
      dispatch(
        removeItemFromCart({
          jwt,
          productId: cartItem.product.id,
        })
      );
    }
  };

  return (
    <div className="border rounded-md relative border-gray-300">
      <div className="p-5 flex gap-3">
        <div>
          <img
            src={cartItem.product.images[0]}
            className="w-[90px] rounded-md"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">{cartItem.product.brand}</h1>
          <p className="text-gray-500 font-semibold">{cartItem.product.name}</p>
          <p className="text-gray-500">Quantity: {cartItem.quantity}</p>
        </div>
        <div className=" absolute top-1 right-1">
          <Button onClick={remove}>
            <Close />
          </Button>
        </div>
      </div>

      <Divider />
      <div className="px-5 py-2 flex justify-between items-center">
        {/* QUANTITY ADD REMOVE */}
        <div className="flex items-center gap-2 w-[140px] justify-between">
          <Button onClick={() => updateQuantity(-1)}>
            <Remove />
          </Button>
          <span>{cartItem.quantity}</span>
          <Button onClick={() => updateQuantity(1)}>
            <Add />
          </Button>
        </div>
        <div>
          <p>{(cartItem.product.price * cartItem.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
