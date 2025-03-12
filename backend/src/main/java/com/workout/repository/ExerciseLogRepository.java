package com.workout.repository;

import com.workout.model.workouts.ExerciseLog;
import com.workout.model.workouts.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseLogRepository extends JpaRepository<ExerciseLog, Long> {
}
