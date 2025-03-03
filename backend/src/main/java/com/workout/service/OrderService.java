package com.workout.service;

import com.workout.enums.OrderStatus;
import com.workout.model.ecommerce.*;
import com.workout.model.userdetails.Address;
import com.workout.model.userdetails.User;

import java.util.List;


public interface OrderService {

    Order createOrder(User user, Long addressId, Cart cart) throws Exception;
    Order findOrderById(Long id) throws Exception;
    List<Order> orderHistory(Long userId);
    Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception;
    void cancelOrder(Long orderId) throws Exception;
    OrderItem findOrderItemById(Long id) throws Exception;

}
