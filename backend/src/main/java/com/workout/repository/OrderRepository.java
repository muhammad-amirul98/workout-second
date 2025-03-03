package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long id);

}
