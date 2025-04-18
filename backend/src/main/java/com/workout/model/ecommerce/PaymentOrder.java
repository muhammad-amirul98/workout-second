package com.workout.model.ecommerce;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class PaymentOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private PaymentMethod paymentMethod;

    @Column(columnDefinition = "TEXT")
    private String paymentLinkId;

    @OneToOne
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

}
