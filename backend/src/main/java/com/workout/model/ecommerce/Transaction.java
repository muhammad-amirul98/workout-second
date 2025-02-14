package com.workout.model.ecommerce;

import com.workout.enums.OrderStatus;
import com.workout.enums.PaymentStatus;
import com.workout.model.userdetails.Address;
import com.workout.model.userdetails.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private String transactionId; // Stores Stripe or Razorpay transaction ID

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING; // SUCCESS, FAILED, PENDING

    private String paymentGateway; // "Stripe", "Razorpay", etc.

    private LocalDateTime createdAt = LocalDateTime.now();
}

