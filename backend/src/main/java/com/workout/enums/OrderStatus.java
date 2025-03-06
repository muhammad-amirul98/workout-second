package com.workout.enums;

public enum OrderStatus {
    PENDING,         // Order has been created but not yet processed
    PROCESSING,      // Order is being prepared and packed
    SHIPPED,         // Order has been shipped to the customer
    DELIVERED,       // Order has been delivered to the customer
    CANCELLED,        // Order has been canceled
    REFUNDED,        // Order has been refunded
    FAILED,          // Order failed (e.g., payment failed, delivery issue)
    RETURNED,        // Order has been returned by the customer
    RETURN_REQUESTED; // User has requested a return for the order
}
