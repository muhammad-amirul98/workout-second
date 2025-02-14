package com.workout.model.ecommerce;

import com.workout.enums.PaymentGateway;
import com.workout.enums.PaymentMethod;
import com.workout.enums.PaymentStatus;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDetails {

    private PaymentStatus status;          // Current status of the payment
    private String transactionId;          // Unique ID for the payment transaction assigned by gateway
    private PaymentMethod paymentMethod;          // Payment method used (e.g., Credit Card, PayPal)
    private PaymentGateway paymentGateway;         // The gateway used to process payment (e.g., Stripe, PayPal)
    private double amount;                 // The amount of the payment
    private String currency;
}
