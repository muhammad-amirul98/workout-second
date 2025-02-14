package com.workout.repository;

import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {


}
