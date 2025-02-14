package com.workout.controller;

import com.workout.exception.UserException;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.PaymentOrder;
import com.workout.model.userdetails.User;
import com.workout.response.ApiResponse;
import com.workout.response.PaymentLinkResponse;
import com.workout.response.StripeResponse;
import com.workout.service.PaymentService;
import com.workout.service.StripeService;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stripe")
public class StripeController {

    private final UserService userService;
    private final StripeService stripeService;

    @PostMapping
    public ResponseEntity<StripeResponse> checkoutOrder(@RequestBody Order order,
                                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {

        User user = userService.findUserByJwtToken(jwt);
        if (!order.getUser().equals(user)) {
            // If users do not match, return FORBIDDEN response
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(StripeResponse.builder()
                            .status("FAILURE")
                            .message("Unauthorized access: User does not match the order.")
                            .build());
        }

        StripeResponse stripeResponse = stripeService.checkoutOrder(order);
        return ResponseEntity.status(HttpStatus.OK).body(stripeResponse);
    }
}
