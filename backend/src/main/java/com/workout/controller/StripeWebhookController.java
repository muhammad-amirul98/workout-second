package com.workout.controller;

import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.model.checkout.Session;
import com.stripe.model.checkout.SessionCollection;
import com.stripe.net.Webhook;
import com.workout.model.ecommerce.Order;
import com.workout.service.CartService;
import com.workout.service.OrderService;
import com.workout.service.TransactionService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stripe-webhook")
public class StripeWebhookController {

    private final OrderService orderService;
    private final CartService cartService;

    private static final String STRIPE_WEBHOOK_SECRET = "whsec_fb7d298ef81b6c0605868da8caa03769b8b6dcb8fafdf51dbfc8a124d1b07588";

    @PostMapping
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sig) {
        try {

            Event event = Webhook.constructEvent(payload, sig, STRIPE_WEBHOOK_SECRET);
            Optional<StripeObject> eventData = event.getDataObjectDeserializer().getObject();
            if (eventData.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid Event");
            }

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) eventData.get();
                String sessionId = session.getId();

                if ("paid".equals(session.getPaymentStatus())) {
                    orderService.markOrderAsPaid(sessionId);
                    cartService.emptyCart(sessionId);
                } else {
                    orderService.markOrderAsFailed(sessionId);
                }
            } else if ("payment_intent.payment_failed".equals(event.getType())) {
                System.out.println("1");
                PaymentIntent paymentIntent = (PaymentIntent) eventData.get();
                System.out.println("2");

                String paymentIntentId = paymentIntent.getId();
                System.out.println("3");

                SessionCollection sessions = Session.list(Map.of("payment_intent", paymentIntentId));
                System.out.println("4");

                if (!sessions.getData().isEmpty()) {
                    System.out.println("5");

                    String sessionId = sessions.getData().getFirst().getId();
                    System.out.println(sessionId);
                    System.out.println("6");


                    orderService.markOrderAsFailed(sessionId); // Use sessionId instead of paymentIntentId
                }
            }

            return ResponseEntity.ok("Webhook received");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook error");
        }
    }
}


