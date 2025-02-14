package com.workout.repository;

import com.workout.model.ecommerce.Category;
import com.workout.model.workouts.WorkoutType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByName(String category);
}
