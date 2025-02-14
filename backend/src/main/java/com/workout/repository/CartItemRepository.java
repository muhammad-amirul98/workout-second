package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartAndProduct(Cart cart, Product product);

}
