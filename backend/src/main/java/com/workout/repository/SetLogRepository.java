package com.workout.repository;

import com.workout.model.workouts.ExerciseLog;
import com.workout.model.workouts.SetLog;
import com.workout.model.workouts.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SetLogRepository extends JpaRepository<SetLog, Long> {

}
