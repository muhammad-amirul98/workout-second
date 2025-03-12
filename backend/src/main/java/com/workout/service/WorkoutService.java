package com.workout.service;

import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.Set;
import com.workout.model.workouts.Workout;
import com.workout.model.workouts.WorkoutLog;
import com.workout.request.CreateExerciseRequest;
import com.workout.request.CreateWorkoutRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WorkoutService {

    Workout createWorkout(CreateWorkoutRequest req, User user);
    Workout addExerciseToWorkout(String exerciseName, User user, Long workoutId) throws Exception;
    Exercise createExercise(CreateExerciseRequest req, User user);
    Exercise addSetToExercise(Long exerciseId, User user, Set set) throws Exception;
    void deleteExercise(Long exerciseId, User user) throws WorkoutException;
    WorkoutLog startWorkout(Long workoutId, User user) throws WorkoutException;
    WorkoutLog endWorkout(Long workoutId, User user) throws WorkoutException;
    void deleteWorkout(Long workoutId, User user) throws WorkoutException;
    Workout updateWorkout(Long workoutId, CreateWorkoutRequest req, User user) throws WorkoutException;
    Workout findWorkoutById(Long workoutId) throws WorkoutException;
    List<Exercise> searchExercises(String query);
    List<Workout> searchWorkouts(String query);
    Page<Workout> getAllWorkoutsByPage(
            String type
    );
    List<Workout> getAllWorkouts();
    List<Exercise> getAllExercises();
    java.util.Set<Workout> getWorkoutsByUserId(Long userId) throws Exception;





}
