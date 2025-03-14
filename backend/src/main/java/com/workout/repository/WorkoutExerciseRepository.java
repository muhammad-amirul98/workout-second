package com.workout.repository;

import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.Workout;
import com.workout.model.workouts.WorkoutExercise;
import com.workout.model.workouts.WorkoutSet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutExerciseRepository extends JpaRepository<WorkoutExercise, Long> {
    boolean existsByWorkoutAndExercise(Workout workout, Exercise exercise);
    WorkoutExercise findByWorkoutAndExercise(Workout workout, Exercise exercise);
}
