package com.workout.service.impl;

import com.workout.enums.OrderStatus;
import com.workout.enums.PaymentStatus;
import com.workout.model.ecommerce.*;
import com.workout.model.userdetails.Address;
import com.workout.model.userdetails.User;
import com.workout.repository.*;
import com.workout.service.OrderService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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
    public Order findOrderBySessionId(String sessionId) throws Exception {
        return orderRepository.findBySessionId(sessionId);
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
        order.setOrderStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

    @Override
    public OrderItem findOrderItemById(Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(() -> new Exception("Order Item not found: " + id));
    }

    @Override
    public List<Order> findAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Page<Order> findAllOrdersByPage(String sort, Integer pageNumber, Integer pageSize) {
        // Sorting logic
        Sort sorting = Sort.by("id"); // Default sorting by order ID
        if ("price".equalsIgnoreCase(sort)) {
            sorting = Sort.by("totalPrice");
        } else if ("date".equalsIgnoreCase(sort)) {
            sorting = Sort.by("orderDate"); // Assuming "orderDate" is the field for the order date
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            sorting = Sort.by("totalPrice").descending();
        }

        // Pagination
        Pageable pageable = PageRequest.of(pageNumber, pageSize != null ? pageSize : 10, sorting);

        // Fetching orders from the repository with pagination
        return orderRepository.findAll(pageable);
    }



    @Override
    public void markOrderAsPaid(String sessionId) {
        Order order = orderRepository.findBySessionId(sessionId);
        if (order != null) {
            order.setPaymentStatus(PaymentStatus.COMPLETED);
            orderRepository.save(order);
        }

    }

    @Override
    public void markOrderAsFailed(String sessionId) {
        if (sessionId != null) {
            // Try to find the order by sessionId

            Order order = orderRepository.findBySessionId(sessionId);

            if (order != null) {

                // Mark the order as failed
                order.setPaymentStatus(PaymentStatus.FAILED);
                orderRepository.save(order);
            }
        }
    }







}
