package com.workout.service;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.workout.enums.PaymentMethod;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.PaymentOrder;
import com.workout.response.PaymentLinkResponse;

public interface PaymentService {
    void createPaymentOrder(Order order, String paymentLinkId, PaymentMethod paymentMethod);
    PaymentOrder getPaymentOrderById(Long orderId) throws Exception;
    PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception;
    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId,
                                String paymentLinkId) throws RazorpayException;
    PaymentLink createRazorPayPaymentLink(Order order) throws RazorpayException;
    PaymentLinkResponse createStripePaymentLink(Order order) throws StripeException;

}
