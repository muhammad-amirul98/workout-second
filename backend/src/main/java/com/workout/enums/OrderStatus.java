package com.workout.enums;

public enum OrderStatus {
    PENDING,     // Order has been created but not yet processed
    SHIPPED,     // Order has been shipped to the customer
    DELIVERED,   // Order has been delivered to the customer
    CANCELED,    // Order has been canceled
    RETURNED,    // Order has been returned by the customer
    COMPLETED,   // Order has been successfully completed
    FAILED; // Order failed (e.g., payment failed, delivery issue)
}
