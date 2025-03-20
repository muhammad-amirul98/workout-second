package com.workout.service;

import com.workout.dto.WorkoutCountDTO;
import com.workout.dto.WorkoutVolumeDTO;
import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.*;
import com.workout.request.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WorkoutService {

    Workout createWorkout(CreateWorkoutRequest req, User user);
    WorkoutExercise addExerciseToWorkout(Long exerciseId, User user, Long workoutId) throws Exception;
    Exercise createExercise(CreateExerciseRequest req, User user);
    WorkoutSet addSetToExercise(Long workoutExerciseId, User user, CreateSetRequest set) throws Exception;
    void deleteExercise(Long exerciseId, User user) throws WorkoutException;
    WorkoutLog startWorkout(Long workoutId, User user) throws WorkoutException;
    WorkoutLog completeWorkout(Long workoutId, User user) throws WorkoutException;
    WorkoutLog cancelWorkout(Long workoutId, User user) throws WorkoutException;
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
    List<WorkoutLog> getWorkoutLogsByUserId(User user);
    void deleteWorkoutLog(Long workoutLogId, User user) throws Exception;
    SetLog completeSetLog(Long setLogId, User user, CompleteSetLogRequest req) throws Exception;
    SetLog uncompleteSetLog(Long setLogId, User user) throws Exception;
    List<WorkoutVolumeDTO> getWorkoutVolume(User user);
    List<WorkoutCountDTO> getWorkoutCountCompletedOverTime(User user);




}
