package com.workout.service.impl;

import com.workout.enums.OrderStatus;
import com.workout.model.ecommerce.*;
import com.workout.model.userdetails.Address;
import com.workout.model.userdetails.User;
import com.workout.repository.*;
import com.workout.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public Order createOrder(User user, Long addressId, Cart cart) throws Exception {
        Address address = addressRepository.findById(addressId).
                orElseThrow(() -> new Exception("Address Not Found"));

        Order order = new Order();

        order.setTotalPrice(cart.getTotalPrice());

        order.setShippingAddress(address);

        order.setUser(user);

        Set<OrderItem> orderItems = order.getOrderItems();
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());

            orderItems.add(orderItem);
        }
        order.setOrderItems(orderItems);
        return orderRepository.save(order);
    }

    @Override
    public Order findOrderById(Long id) throws Exception {
        return orderRepository.findById(id)
                .orElseThrow(() -> new Exception("Order not found with id: " + id));
    }

    @Override
    public List<Order> orderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new Exception("Order not found with id: " + orderId));
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        Order order = orderRepository.findById(orderId).
                orElseThrow(() -> new Exception("Order not found with id: " + orderId));
        order.setOrderStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
    }

    @Override
    public OrderItem findOrderItemById(Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(() -> new Exception("Order Item not found: " + id));
    }


}
