package com.workout.service.impl;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.Product;
import com.workout.model.userdetails.User;
import com.workout.repository.CartItemRepository;
import com.workout.repository.CartRepository;
import com.workout.repository.OrderRepository;
import com.workout.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;


@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;

    @Override
    public CartItem addCartItem(User user, Product product) {
        Cart cart = findUserCart(user);
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(1);
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        }

        cartItemRepository.save(cartItem);
        updateCartTotals(cart);
        return cartItem;
    }

    @Override
    public void removeCartItem(User user, Product product) {
        Cart cart = findUserCart(user);
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (cartItem != null) {
            cart.getCartItems().remove(cartItem);
            cartItemRepository.delete(cartItem);
            updateCartTotals(cart);
        }
    }


    @Override
    public Cart findUserCart(User user) {
        return cartRepository.findByUserId(user.getId());
    }

    @Override
    public CartItem updateCartItemQuantity(User user, Product product, int quantity) {
        Cart cart = findUserCart(user);
        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product);
        if (cartItem != null) {
            int newQuantity = cartItem.getQuantity() + quantity;
            if (newQuantity < 0) {
                newQuantity = 0;
            }
            cartItem.setQuantity(newQuantity);
            updateCartTotals(cart);
            return cartItemRepository.save(cartItem);
        }

        return null;
    }

    @Override
    public void emptyCart(String sessionId) {

            Order order = orderRepository.findBySessionId(sessionId);

            Cart cart = cartRepository.findByUserId(order.getUser().getId());

            cart.getCartItems().clear(); // Resetting items to an empty list
            cart.setTotalPrice(0.0); // Reset the total price
            cart.setTotalItems(0); // Reset the item count

            cartRepository.save(cart);

    }

    private void updateCartTotals(Cart cart) {
        double totalPrice = cart.getCartItems().stream()
                .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity())
                .sum();
        int totalItems = cart.getCartItems().stream()
                .mapToInt(CartItem::getQuantity)
                .sum();
        cart.setTotalPrice(totalPrice + 10);
        cart.setTotalItems(totalItems);
        cartRepository.save(cart);
    }
}
