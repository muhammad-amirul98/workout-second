package com.workout.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.PaymentOrder;
import com.workout.model.userdetails.User;

public interface PaymentService {
    PaymentOrder createPaymentOrder(Order order);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId,
                                String paymentLinkId) throws RazorpayException;
    PaymentLink createRazorPayPaymentLink(Order order) throws RazorpayException;
    String createStripePaymentLink(Order order) throws StripeException;

}
