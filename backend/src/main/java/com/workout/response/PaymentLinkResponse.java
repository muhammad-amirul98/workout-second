package com.workout.response;

import lombok.Data;

@Data
public class PaymentLinkResponse {
    private String paymentLinkUrl;
    private String paymentLinkId;
}
