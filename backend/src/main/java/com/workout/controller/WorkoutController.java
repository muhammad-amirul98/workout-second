package com.workout.controller;

import com.workout.exception.UserException;
import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.Workout;
import com.workout.model.workouts.WorkoutLog;
import com.workout.request.CreateExerciseRequest;
import com.workout.request.CreateWorkoutRequest;
import com.workout.service.UserService;
import com.workout.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;


@RestController
@RequiredArgsConstructor
@RequestMapping("/workout")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Workout> createWorkout(@RequestBody CreateWorkoutRequest req,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        Workout workout = workoutService.createWorkout(req, user);
        return ResponseEntity.ok(workout);
    }

    @PostMapping("/exercise")
    public ResponseEntity<Exercise> createExercise(@RequestBody CreateExerciseRequest req,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        Exercise exercise = workoutService.createExercise(req, user);
        return ResponseEntity.ok(exercise);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.getAllWorkouts());
    }

    @GetMapping("/all/exercises")
    public ResponseEntity<List<Exercise>> getAllExercises() {
        return ResponseEntity.ok(workoutService.getAllExercises());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Set<Workout>> getUserWorkouts(@PathVariable Long userId) throws Exception {
        return ResponseEntity.ok(workoutService.getWorkoutsByUserId(userId));
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long workoutId) throws Exception {
        return ResponseEntity.ok(workoutService.findWorkoutById(workoutId));
    }

    @PostMapping("/{workoutId}/exercise")
    public ResponseEntity<Workout> addExerciseToWorkout(@RequestParam String exerciseName,
                                                        @PathVariable Long workoutId,
                                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Workout workout = workoutService.addExerciseToWorkout(exerciseName, user, workoutId);
        return ResponseEntity.ok(workout);
    }

    @PostMapping("/exercise/{exerciseId}")
    public ResponseEntity<Exercise> addSetToExercise(@RequestBody com.workout.model.workouts.Set set,
                                                        @PathVariable Long exerciseId,
                                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Exercise exercise = workoutService.addSetToExercise(exerciseId, user, set);
        return ResponseEntity.ok(exercise);
    }

    @PostMapping("/{workoutId}/start")
    public ResponseEntity<WorkoutLog> startWorkout(@PathVariable Long workoutId,
                                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutLog workoutLog = workoutService.startWorkout(workoutId, user);
        return ResponseEntity.ok(workoutLog);
    }

    @PostMapping("/{workoutId}/end")
    public ResponseEntity<WorkoutLog> endWorkout(@PathVariable Long workoutId,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutLog workoutLog = workoutService.endWorkout(workoutId, user);
        return ResponseEntity.ok(workoutLog);
    }

    @DeleteMapping("/{workoutId}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long workoutId,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        workoutService.deleteWorkout(workoutId, user);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/exercise/{exerciseId}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long exerciseId,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        workoutService.deleteExercise(exerciseId, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<Workout>> searchWorkouts(@RequestParam String query) {
        List<Workout> workouts = workoutService.searchWorkouts(query);
        return ResponseEntity.ok(workouts);
    }

    @GetMapping("/search/exercises")
    public ResponseEntity<List<Exercise>> searchExercises(@RequestParam String query) {
        List<Exercise> exercises = workoutService.searchExercises(query);
        return ResponseEntity.ok(exercises);
    }

    @PutMapping("/update/{workoutId}")
    public ResponseEntity<Workout> updateWorkout(@RequestBody CreateWorkoutRequest req,
                                                 @PathVariable Long workoutId,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException, WorkoutException {
        User user = userService.findUserByJwtToken(jwt);
        Workout workout = workoutService.updateWorkout(workoutId, req, user);
        return ResponseEntity.ok(workout);
    }







}
