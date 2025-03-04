package com.workout.request;

import com.workout.model.workouts.Exercise;
import lombok.Data;

import java.util.Set;

@Data
public class CreateOrderRequest {
    Long addressId;
    String paymentMethod;
}
