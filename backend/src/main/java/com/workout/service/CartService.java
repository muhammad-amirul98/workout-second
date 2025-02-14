package com.workout.service;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Product;
import com.workout.model.userdetails.User;


public interface CartService {

    CartItem addCartItem(
            User user,
            Product product,
            int quantity
    );

    void removeCartItem(
            User user,
            Product product,
            int quantity
    );

    Cart findUserCart(User user);





}
