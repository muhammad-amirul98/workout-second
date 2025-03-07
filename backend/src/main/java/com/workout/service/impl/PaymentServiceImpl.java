package com.workout.service.impl;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
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


@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

    @Value("${RAZOR_API_KEY}")
    private String razorApiKey;

    @Value("${RAZOR_SECRET_KEY}")
    private String razorSecretKey;

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

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId)
            throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentStatus.PENDING)) {
            RazorpayClient razorpayClient = new RazorpayClient(razorApiKey, razorSecretKey);
            Payment payment = razorpayClient.payments.fetch(paymentId);
            String status = payment.get("status");
            if (status.equals("captured")) {
                paymentOrder.getOrder().setPaymentStatus(PaymentStatus.COMPLETED);
                orderRepository.save(paymentOrder.getOrder());
                paymentOrder.setStatus(PaymentStatus.COMPLETED);
                paymentOrderRepository.save(paymentOrder);
                return true;
            }
            paymentOrder.setStatus(PaymentStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
        return false;
    }

    @Override
    public PaymentLink createRazorPayPaymentLink(Order order) throws RazorpayException {
        Long amount = (long) (order.getTotalPrice() * 100);
        try {
            RazorpayClient razorpayClient = new RazorpayClient(razorApiKey, razorSecretKey);

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amount);
            paymentLinkRequest.put("currency", "SGD");

            JSONObject customer = new JSONObject();
            customer.put("name", order.getUser().getFullName());
            customer.put("email", order.getUser().getEmail());
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkRequest.put("notify", notify);

            paymentLinkRequest.put("callback_url", successUrl + order.getId());
            paymentLinkRequest.put("callback_method", "get");

            PaymentLink paymentLink = razorpayClient.paymentLink.create(paymentLinkRequest);

            String paymentLinkUrl = paymentLink.get("short_url");
            String paymentLinkId = paymentLink.get("id");



            return paymentLink;

        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

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

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.PAYNOW)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl + order.getId())
                .setCancelUrl(cancelUrl + order.getId())
                .addAllLineItem(lineItems)
                .build();

        Session session = Session.create(params);
        PaymentLinkResponse res = new PaymentLinkResponse();
        res.setPaymentLinkUrl(session.getUrl());
        res.setPaymentLinkId(session.getId());
        return res;
    }

    public PaymentStatusResponse retrieveSessionStatus(String sessionId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        Session session = Session.retrieve(sessionId);
        String paymentStatus = session.getPaymentStatus();  // The status will be either "paid" or "unpaid" or other possible statuses

        // Return the payment status as a response
        PaymentStatusResponse paymentStatusResponse = new PaymentStatusResponse();
        if ("paid".equals(paymentStatus)) {
            paymentStatusResponse.setStatus("success");
        } else {
            paymentStatusResponse.setStatus("failed");
        }
        paymentStatusResponse.setSessionId(session.getId());

        return paymentStatusResponse;
    }
}
