package com.workout.controller;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.workout.enums.OrderStatus;
import com.workout.enums.PaymentMethod;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.*;
import com.workout.model.userdetails.Address;
import com.workout.model.userdetails.User;
import com.workout.repository.PaymentOrderRepository;
import com.workout.repository.UserRepository;
import com.workout.request.CreateOrderRequest;
import com.workout.response.PaymentLinkResponse;
import com.workout.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;


@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;
    private final ProductService productService;
    private final PaymentService paymentService;

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createOrder(@RequestBody CreateOrderRequest req,
                                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = user.getCart();

        Order order = orderService.createOrder(user, req.getAddressId(), cart);

        PaymentLinkResponse res = paymentService.createStripePaymentLink(order);

        paymentService.createPaymentOrder(order, res.getPaymentLinkId(), PaymentMethod.valueOf(req.getPaymentMethod()));

        return ResponseEntity.ok(res);

    }

    @GetMapping
    public ResponseEntity<List<Order>> getUsersOrderHistory(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.orderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.findOrderById(orderId);

        if (!order.getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(order);
    }

    @GetMapping("/orderItem/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(@PathVariable Long orderItemId,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        OrderItem orderItem = orderService.findOrderItemById(orderItemId);

        if (!orderItem.getOrder().getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(orderItem);
    }
    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.findOrderById(orderId);

        if (!order.getUser().getId().equals(user.getId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        orderService.cancelOrder(orderId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/allOrders")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.findAllOrders();
        System.out.println(orders);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/allOrdersPage")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<Order>> getAllOrdersByPage(
            @RequestParam(defaultValue = "id") String sort,  // Default sorting by id
            @RequestParam(defaultValue = "0") Integer pageNumber,
            @RequestParam(defaultValue = "10") Integer pageSize
    ) {
        Page<Order> orders = orderService.findAllOrdersByPage(sort, pageNumber, pageSize);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Order>> getUserOrdersById(@PathVariable Long userId) {
        List<Order> orders = orderService.orderHistory(userId);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @PutMapping("/admin/updateStatus/{orderId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus
            (@PathVariable Long orderId, @RequestBody OrderStatus orderStatus) throws Exception {
        Order order = orderService.updateOrderStatus(orderId, orderStatus);
        return new ResponseEntity<>(order, HttpStatus.ACCEPTED);

    }

}
