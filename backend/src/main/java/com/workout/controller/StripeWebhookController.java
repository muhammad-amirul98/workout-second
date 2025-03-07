package com.workout.controller;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.workout.service.OrderService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stripe-webhook")
public class StripeWebhookController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
                                                      @RequestHeader("Stripe-Signature") String sig) {
        try {
            // Verify webhook signature
            Event event = Webhook.constructEvent(payload, sig, "your_stripe_webhook_secret");

            // Handle the event based on its type
            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer().getObject().orElse(null);
                if (session != null) {
                    String sessionId = session.getId();
                    // Mark order as paid in your database
                    orderService.markOrderAsPaid(sessionId);

                }
            } else if ("checkout.session.expired".equals(event.getType())) {
                // Handle expired payments if necessary
            }

            return ResponseEntity.ok("Webhook received");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook error");
        }
    }
}
