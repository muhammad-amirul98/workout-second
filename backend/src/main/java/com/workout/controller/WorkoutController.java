package com.workout.controller;

import com.workout.dto.MaxWeightDTO;
import com.workout.dto.WorkoutCountDTO;
import com.workout.dto.WorkoutVolumeDTO;
import com.workout.exception.UserException;
import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.BodyMeasurement;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.*;
import com.workout.request.*;
import com.workout.service.UserService;
import com.workout.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Update;
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

    @GetMapping
    public ResponseEntity<List<Workout>> getUserWorkouts(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.getWorkoutsByUserId(user.getId()));
    }

    @GetMapping("/{workoutId}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long workoutId,
                                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.findWorkoutById(user, workoutId));
    }

    @PostMapping("/{workoutId}/{exerciseId}/exercise")
    public ResponseEntity<WorkoutExercise> addExerciseToWorkout(@PathVariable Long exerciseId,
                                                                @PathVariable Long workoutId,
                                                                @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutExercise workoutExercise = workoutService.addExerciseToWorkout(exerciseId, user, workoutId);
        return ResponseEntity.ok(workoutExercise);
    }

    @PostMapping("/exercise/{workoutExerciseId}")
    public ResponseEntity<WorkoutSet> addSetToExercise(@RequestBody CreateSetRequest set,
                                                        @PathVariable Long workoutExerciseId,
                                                        @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutSet workoutSet = workoutService.addSetToExercise(workoutExerciseId, user, set);
        return ResponseEntity.ok(workoutSet);
    }

    @PostMapping("/{workoutId}/start")
    public ResponseEntity<WorkoutLog> startWorkout(@PathVariable Long workoutId,
                                                   @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutLog workoutLog = workoutService.startWorkout(workoutId, user);
        return ResponseEntity.ok(workoutLog);
    }

    @PutMapping("/{workoutLogId}/complete")
    public ResponseEntity<WorkoutLog> completeWorkout(@PathVariable Long workoutLogId,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutLog workoutLog = workoutService.completeWorkout(workoutLogId, user);
        return ResponseEntity.ok(workoutLog);
    }

    @PutMapping("/{workoutLogId}/cancel")
    public ResponseEntity<WorkoutLog> cancelWorkout(@PathVariable Long workoutLogId,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutLog workoutLog = workoutService.cancelWorkout(workoutLogId, user);
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


    @PutMapping("/exercise/{exerciseId}")
    public ResponseEntity<Exercise> updateExercise(@PathVariable Long exerciseId,
                                               @RequestBody UpdateExerciseRequest req,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.updateExercise(exerciseId, req, user));
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

    @DeleteMapping("/workout-exercise/{workoutExerciseId}")
    public ResponseEntity<Void> deleteWorkoutExercise(@PathVariable Long workoutExerciseId,
                                                      @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        workoutService.deleteWorkoutExercise(workoutExerciseId, user);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/workout-exercise/set/{workoutSetId}")
    public ResponseEntity<Void> deleteSet(@PathVariable Long workoutSetId,
                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        workoutService.deleteSet(workoutSetId, user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/workout-exercise/{workoutExerciseId}")
    public ResponseEntity<WorkoutExercise> getWorkoutExerciseById(@PathVariable Long workoutExerciseId,
                                                                  @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        WorkoutExercise workoutExercise = workoutService.getWorkoutExercise(workoutExerciseId, user);
        return ResponseEntity.ok(workoutExercise);
    }

    @PutMapping("/set/{workoutSetId}")
    public ResponseEntity<WorkoutSet> updateWorkoutSet(@PathVariable Long workoutSetId,
                                                       @RequestBody UpdateSetRequest req,
                                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.updateWorkoutSet(workoutSetId, user, req));

    }

    @GetMapping("/workout-logs")
    public ResponseEntity<List<WorkoutLog>> getWorkoutLogsByUser(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.getWorkoutLogsByUserId(user));
    }

    @DeleteMapping("/workout-logs/{workoutLogId}")
    public ResponseEntity<Void> deleteWorkoutLogById(
            @PathVariable Long workoutLogId,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        workoutService.deleteWorkoutLog(workoutLogId, user);
        return ResponseEntity.noContent().build();

    }

    @GetMapping("/current-workout")
    public ResponseEntity<WorkoutLog> getCurrentWorkout(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(user.getCurrentWorkout());
    }

    @PutMapping("/set-log/{setLogId}/complete")
    public ResponseEntity<SetLog> completeSetLog(@PathVariable Long setLogId,
                                                       @RequestBody CompleteSetLogRequest req,
                                                       @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.completeSetLog(setLogId, user, req));
    }

    @PutMapping("/set-log/{setLogId}/uncompleted")
    public ResponseEntity<SetLog> uncompletedSetLog(@PathVariable Long setLogId,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.uncompleteSetLog(setLogId, user));
    }

    @GetMapping("/workout-volume")
    public ResponseEntity<List<WorkoutVolumeDTO>> getWorkoutVolume(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.getWorkoutVolume(user));
    }

    @GetMapping("/workout-count")
    public ResponseEntity<List<WorkoutCountDTO>> getWorkoutCount(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.getWorkoutCountCompletedOverTime(user));
    }

    @GetMapping("/workout-max-weight")
    public ResponseEntity<List<MaxWeightDTO>> getMaxWeightSet(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.getMaxWeightLogs(user));
    }

    @PostMapping("/bm")
    public ResponseEntity<BodyMeasurement> updateBodyMeasurements(
            @RequestBody UpdateBodyMeasurementsRequest req,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.addHeightAndWeight(user, req));
    }

    @GetMapping("/bm")
    public ResponseEntity<List<BodyMeasurement>> getUserBodyMeasurements(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(workoutService.getUserBodyMeasurements(user));
    }


}
