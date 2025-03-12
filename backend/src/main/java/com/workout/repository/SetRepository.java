package com.workout.repository;

import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.Set;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SetRepository extends JpaRepository<Set, Long> {
}
