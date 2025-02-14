package com.workout.controller;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.workout.enums.PaymentMethod;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.*;
import com.workout.model.userdetails.Address;
import com.workout.model.userdetails.User;
import com.workout.repository.PaymentOrderRepository;
import com.workout.response.PaymentLinkResponse;
import com.workout.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final CartService cartService;
    private final ProductService productService;
    private final PaymentService paymentService;
    private final PaymentOrderRepository paymentOrderRepository;

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createOrder(@RequestBody Address shippingAddress,
                                                           @RequestParam PaymentMethod paymentMethod,
                                                           @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException, RazorpayException, StripeException {

        User user = userService.findUserByJwtToken(jwt);
        Cart cart = user.getCart();
        Order order = orderService.createOrder(user, shippingAddress, cart);
        PaymentOrder paymentOrder = paymentService.createPaymentOrder(order);
        PaymentLinkResponse res = new PaymentLinkResponse();

        if (paymentMethod.equals(PaymentMethod.RAZORPAY)) {
            PaymentLink paymentLink = paymentService.createRazorPayPaymentLink(order);

            String paymentUrl = paymentLink.get("short_url");
            String paymentUrlId = paymentLink.get("id");

            res.setPaymentLinkUrl(paymentUrl);
            res.setPaymentLinkId(paymentUrlId);

            paymentOrder.setPaymentLinkId(paymentUrlId);
            paymentOrderRepository.save(paymentOrder);
        } else {
            String paymentUrl = paymentService.createStripePaymentLink(order);
            res.setPaymentLinkUrl(paymentUrl);
        }

        return new ResponseEntity<>(res, HttpStatus.OK);

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

}
