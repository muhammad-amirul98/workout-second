package com.workout.service;

import com.workout.model.ecommerce.Order;
import com.workout.model.userdetails.User;
import com.workout.response.StripeResponse;

public interface StripeService {
    StripeResponse checkoutOrder(Order order);
}
