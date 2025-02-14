package com.workout.repository;

import com.workout.model.userdetails.User;
import com.workout.model.workouts.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {

}
