package com.workout.service;

import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.*;
import com.workout.request.CreateExerciseRequest;
import com.workout.request.CreateSetRequest;
import com.workout.request.CreateWorkoutRequest;
import com.workout.request.UpdateSetRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WorkoutService {

    Workout createWorkout(CreateWorkoutRequest req, User user);
    WorkoutExercise addExerciseToWorkout(Long exerciseId, User user, Long workoutId) throws Exception;
    Exercise createExercise(CreateExerciseRequest req, User user);
    WorkoutSet addSetToExercise(Long workoutExerciseId, User user, CreateSetRequest set) throws Exception;
    void deleteExercise(Long exerciseId, User user) throws WorkoutException;
    WorkoutLog startWorkout(Long workoutId, User user) throws WorkoutException;
    WorkoutLog endWorkout(Long workoutId, User user) throws WorkoutException;
    void deleteWorkout(Long workoutId, User user) throws WorkoutException;
    Workout updateWorkout(Long workoutId, CreateWorkoutRequest req, User user) throws WorkoutException;
    Workout findWorkoutById(User user, Long workoutId) throws WorkoutException;
    List<Exercise> searchExercises(String query);
    List<Workout> searchWorkouts(String query);
    Page<Workout> getAllWorkoutsByPage(
            String type
    );
    void deleteWorkoutExercise(Long workoutExerciseId, User user) throws Exception;
    WorkoutExercise getWorkoutExercise(Long workoutExerciseId, User user) throws Exception;
    List<Workout> getAllWorkouts();
    List<Exercise> getAllExercises();
    List<Workout> getWorkoutsByUserId(Long userId) throws Exception;
    void deleteSet(Long setId, User user) throws Exception;
    WorkoutSet updateWorkoutSet(Long workoutSetId, User user, UpdateSetRequest req) throws Exception;



}
