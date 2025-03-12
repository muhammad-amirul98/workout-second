package com.workout.repository;

import com.workout.model.workouts.Set;
import com.workout.model.workouts.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
}
