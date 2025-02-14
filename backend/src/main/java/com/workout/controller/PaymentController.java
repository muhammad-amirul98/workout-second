package com.workout.controller;

import com.workout.model.ecommerce.PaymentOrder;
import com.workout.model.userdetails.User;
import com.workout.response.ApiResponse;
import com.workout.response.PaymentLinkResponse;
import com.workout.service.PaymentService;
import com.workout.service.TransactionService;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;
    private final TransactionService transactionService;

    @GetMapping("/{paymentId}")
    public ResponseEntity<ApiResponse> paymentSuccessHandler(
            @PathVariable String paymentId,
            @RequestParam String paymentLinkId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        PaymentLinkResponse paymentLinkResponse;

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        boolean paymentSuccess = paymentService.ProceedPaymentOrder(
                paymentOrder,
                paymentId,
                paymentLinkId);

        if (paymentSuccess) {
            transactionService.createTransaction(paymentOrder.getOrder());
        }

        ApiResponse res = new ApiResponse();
        res.setMessage("Successful Payment");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}
