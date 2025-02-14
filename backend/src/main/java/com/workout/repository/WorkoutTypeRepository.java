package com.workout.repository;

import com.workout.model.workouts.WorkoutType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutTypeRepository extends JpaRepository<WorkoutType, Long> {

    WorkoutType findByName(String name);
}
