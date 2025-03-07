package com.workout.response;

import lombok.Data;

@Data
public class PaymentStatusResponse {
    private String status;  // Can be "success" or "failed"
    private String sessionId;
}
