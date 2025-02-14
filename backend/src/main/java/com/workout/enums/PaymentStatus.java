package com.workout.enums;

public enum PaymentStatus {
    PENDING,     // Payment is pending and has not yet been completed
    COMPLETED,   // Payment has been successfully completed
    FAILED,      // Payment failed (due to insufficient funds, etc.)
    CANCELED,    // Payment was canceled by the user or system
    REFUNDED,    // Payment has been refunded to the customer
    DECLINED,    // Payment was declined by the payment provider
}
