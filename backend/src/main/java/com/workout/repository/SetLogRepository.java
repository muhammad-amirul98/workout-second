package com.workout.repository;

import com.workout.model.workouts.ExerciseLog;
import com.workout.model.workouts.SetLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SetLogRepository extends JpaRepository<SetLog, Long> {
}
