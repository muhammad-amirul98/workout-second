package com.workout.repository;

import com.workout.model.workouts.WorkoutSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutSetRepository extends JpaRepository<WorkoutSet, Long> {

}
