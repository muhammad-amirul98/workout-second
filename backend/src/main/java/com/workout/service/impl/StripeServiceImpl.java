package com.workout.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.OrderItem;
import com.workout.model.userdetails.User;
import com.workout.response.StripeResponse;
import com.workout.service.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StripeServiceImpl implements StripeService {
    @Value("${STRIPE_SECRET_KEY}")
    private String stripeSecretKey;

    @Value("${APP_FRONTEND_SUCCESS_URL}")
    private String successUrl;

    @Value("${APP_FRONTEND_CANCEL_URL}")
    private String cancelUrl;

    @Override
    public StripeResponse checkoutOrder(Order order) {
        Stripe.apiKey = stripeSecretKey;

        // Create a list to hold line items
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

        // Iterate over the orderItems in the order
        for (OrderItem orderItem : order.getOrderItems()) {
            // Get product details (e.g., name, price, etc.) from orderItem
            String productName = orderItem.getProduct().getName(); // Assuming your orderItem has a reference to a product
            long unitPrice = (long) (orderItem.getProduct().getPrice() * 100); // Convert price to cents
            long quantity = orderItem.getQuantity();

            // Create a line item for the product
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setQuantity(quantity) // Set the quantity of the product
                    .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("SGD")
                                    .setUnitAmount(unitPrice) // Set the price for each unit of the product
                                    .setProductData(
                                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                    .setName(productName)
                                                    .build()
                                    )
                                    .build()
                    )
                    .build();

            // Add the line item to the list
            lineItems.add(lineItem);
        }

        // Create session params with multiple line items
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl + order.getId())
                .setCancelUrl(cancelUrl)
                .addAllLineItem(lineItems) // Add all line items to the session
                .build();

        Session session;
        try {
            session = Session.create(params);
        } catch (StripeException e) {
            return StripeResponse.builder()
                    .status("FAILURE")
                    .message("Stripe Payment Unsuccessful: " + e.getMessage())  // Include error message
                    .build();
        }

        return StripeResponse.builder()
                .status("SUCCESS")
                .sessionId(session.getId())
                .sessionUrl(session.getUrl())
                .build();
    }

}
