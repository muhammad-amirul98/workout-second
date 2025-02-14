package com.workout.service.impl;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Product;
import com.workout.model.userdetails.User;
import com.workout.repository.CartItemRepository;
import com.workout.repository.CartRepository;
import com.workout.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartItem addCartItem(User user, Product product, int quantity) {
        Cart cart = findUserCart(user);
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }

        cartItemRepository.save(cartItem);
        updateCartTotals(cart);
        return cartItem;
    }

    @Override
    public void removeCartItem(User user, Product product, int quantity) {
        Cart cart = findUserCart(user);
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (cartItem != null) {
            int updatedQuantity = cartItem.getQuantity() - quantity;
            if (updatedQuantity <= 0) {
                cart.getCartItems().remove(cartItem);
                cartItemRepository.delete(cartItem);
            } else {
                cartItem.setQuantity(updatedQuantity);
                cartItemRepository.save(cartItem);
            }
            updateCartTotals(cart);
        }
    }

    @Override
    public Cart findUserCart(User user) {
        return cartRepository.findByUserId(user.getId());
    }

    private void updateCartTotals(Cart cart) {
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
        int totalItems = cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
        cart.setTotalPrice(totalPrice);
        cart.setTotalItems(totalItems);
        cartRepository.save(cart);
    }
}
