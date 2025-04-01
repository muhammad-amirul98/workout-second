package com.workout.service.impl;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.workout.enums.PaymentMethod;
import com.workout.enums.PaymentStatus;
import com.workout.model.ecommerce.*;
import com.workout.repository.*;
import com.workout.response.PaymentLinkResponse;
import com.workout.response.PaymentStatusResponse;
import com.workout.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

//    @Value("${RAZOR_API_KEY}")
//    private String razorApiKey;

//    @Value("${RAZOR_SECRET_KEY}")
//    private String razorSecretKey;

    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Value("${APP_FRONTEND_SUCCESS_URL}")
    private String successUrl;

    @Value("${APP_FRONTEND_CANCEL_URL}")
    private String cancelUrl;


    @Override
    public void createPaymentOrder(Order order, String paymentLinkId, PaymentMethod paymentMethod) {

        PaymentOrder paymentOrder = new PaymentOrder();

        paymentOrder.setOrder(order);

        paymentOrder.setPaymentMethod(paymentMethod);

        paymentOrder.setPaymentLinkId(paymentLinkId);

        paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId).orElseThrow(() -> new Exception("Payment Not Found."));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) throws Exception {
        return paymentOrderRepository.findByPaymentLinkId(paymentId);
    }

//    @Override
//    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId)
//            throws RazorpayException {
//        if (paymentOrder.getStatus().equals(PaymentStatus.PENDING)) {
//            RazorpayClient razorpayClient = new RazorpayClient(razorApiKey, razorSecretKey);
//            Payment payment = razorpayClient.payments.fetch(paymentId);
//            String status = payment.get("status");
//            if (status.equals("captured")) {
//                paymentOrder.getOrder().setPaymentStatus(PaymentStatus.COMPLETED);
//                orderRepository.save(paymentOrder.getOrder());
//                paymentOrder.setStatus(PaymentStatus.COMPLETED);
//                paymentOrderRepository.save(paymentOrder);
//                return true;
//            }
//            paymentOrder.setStatus(PaymentStatus.FAILED);
//            paymentOrderRepository.save(paymentOrder);
//            return false;
//        }
//        return false;
//    }

    @Override
    public PaymentLinkResponse createStripePaymentLink(Order order) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();
        for (OrderItem item : order.getOrderItems()) {
            lineItems.add(
                    SessionCreateParams.LineItem.builder()
                            .setQuantity((long) item.getQuantity())
                            .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("SGD")
                                    .setUnitAmount(BigDecimal.valueOf(item.getProduct().getPrice() * 100).longValue())
                                    .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName(item.getProduct().getName())
                                            .build()
                                    ).build()
                            ).build()
            );
        }

        // Fixed delivery fee of $10
        double deliveryPrice = 10.0; // Delivery price in SGD
        lineItems.add(
                SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)  // Single delivery charge
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("SGD")
                                .setUnitAmount(BigDecimal.valueOf(deliveryPrice * 100).longValue())  // Convert delivery price to cents
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Delivery Fee")
                                        .build()
                                ).build()
                        ).build()
        );


        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.PAYNOW)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl + order.getId())
                .setCancelUrl(cancelUrl + order.getId())
                .addAllLineItem(lineItems)
                .build();

        Session session = Session.create(params);

//        // Create PaymentIntent with the order amount and currency
//        PaymentIntentCreateParams paymentIntentParams = PaymentIntentCreateParams.builder()
//                .setAmount(BigDecimal.valueOf(order.getTotalPrice()).longValue())  // Amount in cents
//                .setCurrency("sgd")
//                .build();
//
//        PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentParams);

//        order.setPaymentIntentId(paymentIntent.getId());
//        System.out.println("HELLO");
//        System.out.println(paymentIntent.getId());
//         Store sessionId in the database
        order.setSessionId(session.getId());

        orderRepository.save(order);

        PaymentLinkResponse res = new PaymentLinkResponse();
        res.setPaymentLinkUrl(session.getUrl());
        res.setPaymentLinkId(session.getId());
        res.setPaymentIntentId(null);
        return res;
    }

    public PaymentStatusResponse retrieveSessionStatus(String sessionId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Session session = Session.retrieve(sessionId);
        String paymentStatus = session.getPaymentStatus();
        Order order = orderRepository.findBySessionId(sessionId);// The status will be either "paid" or "unpaid" or other possible statuses

        // Return the payment status as a response
        PaymentStatusResponse paymentStatusResponse = new PaymentStatusResponse();
        if ("paid".equals(paymentStatus)) {
            order.setPaymentStatus(PaymentStatus.COMPLETED);
        } else {
            order.setPaymentStatus(PaymentStatus.FAILED);
        }
        paymentStatusResponse.setSessionId(session.getId());

        return paymentStatusResponse;
    }
}
