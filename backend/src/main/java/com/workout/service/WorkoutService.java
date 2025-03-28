package com.workout.service;

import com.workout.dto.MaxWeightDTO;
import com.workout.dto.WorkoutCountDTO;
import com.workout.dto.WorkoutVolumeDTO;
import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.BodyMeasurement;
import com.workout.model.userdetails.User;
import com.workout.model.userdetails.UserProgress;
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
    Exercise updateExercise(Long exerciseId, UpdateExerciseRequest req, User user) throws WorkoutException;
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
    List<MaxWeightDTO> getMaxWeightLogs(User user);
    BodyMeasurement addHeightAndWeight(User user, UpdateBodyMeasurementsRequest req);
    List<BodyMeasurement> getUserBodyMeasurements(User user);
    UserProgress getUserProgress(User user);
    BodyMeasurement updateHeightAndWeight(User user, UpdateBodyMeasurementsRequest req, Long bodyMeasurementId) throws Exception;
    void deleteBodyMeasurements(User user, Long bodyMeasurementId) throws Exception;


    WorkoutLog addExerciseToCurrentWorkout(Long exerciseId, User user, Long workoutLogId) throws Exception;

    ExerciseLog addSetToExerciseInCurrentWorkout(Long exerciseLogId, User user) throws Exception;
}
