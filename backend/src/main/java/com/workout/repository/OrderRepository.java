package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long id);
    Page<Order> findAll(Pageable pageable);
    Order findBySessionId(String sessionId);
    Order findByPaymentIntentId(String paymentIntentId);


}
