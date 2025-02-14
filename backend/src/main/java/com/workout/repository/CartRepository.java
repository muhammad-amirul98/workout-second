package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.workouts.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUserId(Long id);
}
