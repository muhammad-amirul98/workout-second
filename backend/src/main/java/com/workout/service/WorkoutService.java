package com.workout.service;

import com.workout.exception.UserException;
import com.workout.exception.WorkoutException;
import com.workout.model.ecommerce.Product;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.Workout;
import com.workout.request.CreateWorkoutRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WorkoutService {

    Workout createWorkout(CreateWorkoutRequest req, User user);
    Workout startWorkout(Long workoutId) throws WorkoutException;
    Workout endWorkout(Long workoutId) throws WorkoutException;
    void deleteWorkout(Long workoutId);
    Workout updateWorkout(Long workoutId, Workout workout);
    Workout findWorkoutById(Long workoutId);
    List<Workout> searchWorkouts();
    Page<Workout> getAllWorkouts(
            String type
    );
    List<Workout> getWorkoutByUserId(Long userId);





}
