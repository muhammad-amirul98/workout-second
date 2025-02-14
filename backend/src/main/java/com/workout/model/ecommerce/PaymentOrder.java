package com.workout.model.ecommerce;

import com.workout.enums.PaymentMethod;
import com.workout.enums.PaymentStatus;
import com.workout.model.userdetails.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(nullable = false, unique = true)
    private String paymentLinkId;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

}
