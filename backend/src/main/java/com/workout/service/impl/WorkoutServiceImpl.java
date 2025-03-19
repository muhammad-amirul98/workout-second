package com.workout.service.impl;

import com.workout.enums.WorkoutStatus;
import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.*;
import com.workout.repository.*;
import com.workout.request.*;
import com.workout.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.hibernate.jdbc.Work;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Array;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutLogRepository workoutLogRepository;
    private final SetLogRepository setLogRepository;
    private final UserRepository userRepository;
    private final WorkoutExerciseRepository workoutExerciseRepository;
    private final WorkoutSetRepository workoutSetRepository;


    @Override
    public Workout createWorkout(CreateWorkoutRequest req, User user) {
        Workout workout = new Workout();
        workout.setName(req.getName());
        workout.setType(req.getType());
        workout.setUser(user);
        return workoutRepository.save(workout);
    }

    @Override
    public WorkoutExercise addExerciseToWorkout(Long exerciseId, User user, Long workoutId) throws Exception {

        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new Exception("Exercise Not Found"));

        Workout workout = workoutRepository.findById(workoutId).
                orElseThrow(() -> new Exception("Workout Not Found"));

        if (!workout.getUser().equals(user)) {
            throw new Exception("You are not authorized to modify this workout");
        }

        boolean exists = workoutExerciseRepository.existsByWorkoutAndExercise(workout, exercise);

        if (exists) {
            throw new Exception("Exercise already exists in workout");
        }

        WorkoutExercise workoutExercise = new WorkoutExercise();
        workoutExercise.setExercise(exercise);
        workoutExercise.setWorkout(workout);

        return workoutExerciseRepository.save(workoutExercise);
    }

    @Override
    public WorkoutSet addSetToExercise(Long workoutExerciseId, User user, CreateSetRequest set) throws Exception {

        WorkoutExercise workoutExercise = workoutExerciseRepository.findById(workoutExerciseId).
                orElseThrow(() -> new Exception("Workout Exercise Not Found"));

        WorkoutSet workoutSet = new WorkoutSet();
        workoutSet.setWorkoutExercise(workoutExercise);
        workoutSet.setSetNumber(set.getSetNumber());
        workoutSet.setReps(set.getPlannedReps());
        workoutSet.setWeight(set.getPlannedWeight());

        return workoutSetRepository.save(workoutSet);
    }

    @Override
    public Exercise createExercise(CreateExerciseRequest req, User user) {
        Exercise exercise = new Exercise();
        exercise.setName(req.getName());
        exercise.setType(req.getType());
        exercise.setUser(user);
        exercise.setNotDeletable(false);
        if (req.getImages() != null) {
            for (String image : req.getImages()) {
                exercise.getImages().add(image);
            }
        }
        exercise.setDescription(req.getDescription());
        user.getExercises().add(exercise);
        return exerciseRepository.save(exercise);
    }



    @Override
    public void deleteExercise(Long exerciseId, User user) throws WorkoutException {
        Exercise exercise = exerciseRepository.findById(exerciseId)
                .orElseThrow(() -> new WorkoutException("Exercise not found with ID: " + exerciseId));
        if (exercise.getUser() != user) {
            throw new WorkoutException("No authorization to delete this exercise");
        }
        exerciseRepository.delete(exercise);
    }

    @Override
    public WorkoutLog startWorkout(Long workoutId, User user) throws WorkoutException {
        //find workout
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));

        //check authorization
        if (!user.getWorkouts().contains(workout)) {
            throw new WorkoutException("Unauthorized to start workout");
        }

        //check if user already has an ongoing workout
        if (user.getCurrentWorkout() != null){
            throw new WorkoutException("User already has an ongoing workout");
        }

        WorkoutLog workoutLog = new WorkoutLog();
        workoutLog.setTimeStarted(LocalDateTime.now());
        workoutLog.setWorkout(workout);
        workoutLog.setUser(user);

        // populate workout log with sorted exercise values
        List<ExerciseLog> exerciseLogs = workout.getWorkoutExercises().stream()
                .sorted(Comparator.comparing(WorkoutExercise::getId))
                .map(we -> getExerciseLog(we, workoutLog))
                .toList();

        workoutLog.setExerciseLogs(new ArrayList<>(exerciseLogs));

        WorkoutLog savedWorkoutLog = workoutLogRepository.save(workoutLog);

        // Set the current workout for the user
        user.setCurrentWorkout(savedWorkoutLog);
        userRepository.save(user);

        return workoutLog;
    }

    private static ExerciseLog getExerciseLog(WorkoutExercise workoutExercise, WorkoutLog workoutLog) {
        ExerciseLog exerciseLog = new ExerciseLog();
        exerciseLog.setExercise(workoutExercise.getExercise());
        exerciseLog.setWorkoutLog(workoutLog);

        // Create SetLogs based on the sets in the workout exercise
        List<SetLog> setLogs = workoutExercise.getWorkoutSets().stream()
                .sorted(Comparator.comparing(WorkoutSet::getId)) // Sort by ID or natural order
                .map(ws -> createSetLog(ws, exerciseLog))
                .toList();

        exerciseLog.setSetLogs(new ArrayList<>(setLogs)); // Maintain order
        return exerciseLog;
    }

    private static SetLog createSetLog(WorkoutSet workoutSet, ExerciseLog exerciseLog) {
        SetLog setLog = new SetLog();
        setLog.setReps(workoutSet.getReps());
        setLog.setWeight(workoutSet.getWeight());
        setLog.setExerciseLog(exerciseLog);
        return setLog;
    }


    @Override
    public WorkoutLog completeWorkout(Long workoutLogId, User user) throws WorkoutException {
        WorkoutLog workoutLog = workoutLogRepository.findById(workoutLogId)
                .orElseThrow(() -> new WorkoutException("Workout Log not found with ID: " + workoutLogId));

        //check authorization
        if (!user.getWorkouts().contains(workoutLog.getWorkout())) {
            throw new WorkoutException("Unauthorized to start workout");
        }

        //check if current workout is equal to that workout
        if (user.getCurrentWorkout() != workoutLog) {
            throw new WorkoutException("This workout is not currently ongoing");
        }

        workoutLog.setWorkoutStatus(WorkoutStatus.COMPLETED);
        workoutLog.setTimeCompleted(LocalDateTime.now());
        user.setCurrentWorkout(null);
        userRepository.save(user);
        return workoutLogRepository.save(workoutLog);
    }

    @Override
    public WorkoutLog cancelWorkout(Long workoutLogId, User user) throws WorkoutException {
        WorkoutLog workoutLog = workoutLogRepository.findById(workoutLogId)
                .orElseThrow(() -> new WorkoutException("Workout Log not found with ID: " + workoutLogId));

        //check authorization
        if (!user.getWorkouts().contains(workoutLog.getWorkout())) {
            throw new WorkoutException("Unauthorized to start workout");
        }

        //check if current workout is equal to that workout
        if (user.getCurrentWorkout() != workoutLog) {
            throw new WorkoutException("This workout is not currently ongoing");
        }

        workoutLog.setWorkoutStatus(WorkoutStatus.CANCELLED);
        workoutLog.setTimeCompleted(LocalDateTime.now());
        user.setCurrentWorkout(null);
        userRepository.save(user);
        return workoutLogRepository.save(workoutLog);
    }

    @Transactional
    @Override
    public void deleteWorkout(Long workoutId, User user) throws WorkoutException {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));
        if (!user.getWorkouts().contains(workout)) {
            throw new WorkoutException("Unauthorized Deletion of Workout");
        }


        user.getWorkouts().remove(workout);
        workoutRepository.delete(workout);
        workoutRepository.flush();
    }

    @Override
    public Workout updateWorkout(Long workoutId, CreateWorkoutRequest req, User user) throws WorkoutException {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));

        if (!user.getWorkouts().contains(workout)) {
            throw new WorkoutException("Unauthorized update of workout");
        }

        workout.setName(req.getName());
        workout.setType(req.getType());
        return workoutRepository.save(workout);
    }

    @Override
    public Workout findWorkoutById(User user, Long workoutId) throws WorkoutException {
        return workoutRepository.findById(workoutId)
                .filter(workout -> workout.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));
    }

    @Override
    public List<Exercise> searchExercises(String query) {
        return exerciseRepository.searchExercises(query);
    }

    @Override
    public List<Workout> searchWorkouts(String query) {
        return workoutRepository.searchWorkout(query);
    }

    @Override
    public Page<Workout> getAllWorkoutsByPage(String type) {
        return null;
    }

    @Override
    public void deleteWorkoutExercise(Long workoutExerciseId, User user) throws Exception {
        WorkoutExercise workoutExercise = workoutExerciseRepository.findById(workoutExerciseId)
                .orElseThrow(()-> new Exception("Workout Exercise not found with id: " + workoutExerciseId));

        Workout workout = workoutExercise.getWorkout();

        if (!user.getWorkouts().contains(workout)) {
            throw new Exception("Not authorized to delete exercise");
        }

        workoutExerciseRepository.delete(workoutExercise);
    }

    @Override
    public WorkoutExercise getWorkoutExercise(Long workoutExerciseId, User user) throws Exception {
        WorkoutExercise workoutExercise = workoutExerciseRepository.findById(workoutExerciseId)
                .orElseThrow(() -> new Exception("Workout Exercise not found with id: " + workoutExerciseId));

        if (workoutExercise.getWorkout().getUser() != user) {
            throw new Exception("Not authorized to fetch workout exercise");
        }

        return workoutExercise;
    }

    @Override
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public List<Workout> getWorkoutsByUserId(Long userId) throws Exception {
        return workoutRepository.findByUserIdOrderByCreatedOnAsc(userId);
    }

    @Override
    public void deleteSet(Long setId, User user) throws Exception {
        WorkoutSet workoutSet = workoutSetRepository.findById(setId)
                .orElseThrow(() -> new Exception("Workout set not found with id: " + setId));
        workoutSetRepository.delete(workoutSet);
    }

    @Override
    public WorkoutSet updateWorkoutSet(Long workoutSetId, User user, UpdateSetRequest req) throws Exception {
        WorkoutSet workoutSet = workoutSetRepository.findById(workoutSetId)
                .orElseThrow(() -> new Exception("Workout set not found with id: " + workoutSetId));
        if (workoutSet.getWorkoutExercise().getWorkout().getUser() != user) {
            throw new Exception("Not authorized to edit this workout set");
        }
        workoutSet.setSetNumber(req.getSetNumber());
        workoutSet.setReps(req.getPlannedReps());
        workoutSet.setWeight(req.getPlannedWeight());

        return workoutSetRepository.save(workoutSet);
    }

    @Override
    public List<WorkoutLog> getWorkoutLogsByUserId(User user) {
        return user.getWorkouts().stream()
                .flatMap(workout -> workout.getWorkoutLogs().stream()) // Flatten all workout logs
                .sorted((log1, log2) -> {
                    // Sort by timeStarted, descending order (latest first)
                    return log2.getTimeStarted().compareTo(log1.getTimeStarted());
                })
                .collect(Collectors.toList());
    }

    @Override
    public void deleteWorkoutLog(Long workoutLogId, User user) throws Exception {
        WorkoutLog workoutLog = workoutLogRepository.findById(workoutLogId)
                .orElseThrow(() -> new Exception("Workout Log not found with id: " + workoutLogId));

        if (workoutLog.getWorkout().getUser() != user) {
            throw new Exception("Not authorized to delete this workout");
        }

        if (user.getCurrentWorkout() != null && user.getCurrentWorkout().equals(workoutLog)) {
            user.setCurrentWorkout(null);
            userRepository.save(user); // Ensure the change is persisted
        }
        workoutLogRepository.delete(workoutLog);
    }

    @Override
    public SetLog completeSetLog(Long setLogId, User user, CompleteSetLogRequest req) throws Exception {
        SetLog setLog = setLogRepository.findById(setLogId)
                .orElseThrow(() -> new Exception("Set Log not found with id: " + setLogId));
        if (setLog.getExerciseLog().getWorkoutLog().getWorkout().getUser() != user) {
            throw new Exception("Not authorized to update set");
        }
        setLog.setWeight(req.getWeight());
        setLog.setReps(req.getReps());
        setLog.setComplete(true);
        setLog.setTimeCompleted(LocalDateTime.now());
        return setLogRepository.save(setLog);
    }

    @Override
    public SetLog uncompleteSetLog(Long setLogId, User user) throws Exception {
        SetLog setLog = setLogRepository.findById(setLogId)
                .orElseThrow(() -> new Exception("Set Log not found with id: " + setLogId));
        if (setLog.getExerciseLog().getWorkoutLog().getWorkout().getUser() != user) {
            throw new Exception("Not authorized to update set");
        }
        setLog.setComplete(false);
        return setLogRepository.save(setLog);
    }

}


//public Workout createWorkout(CreateWorkoutRequest req, User user) {
//
////        WorkoutType workoutType1 = workoutTypeRepository.findByName(req.getType1());
////        if (workoutType1 == null) {
////            WorkoutType workoutType = new WorkoutType();
////            workoutType.setName(req.getType1());
////            workoutType1 = workoutTypeRepository.save(workoutType);
////        }
////        WorkoutType workoutType2 = workoutTypeRepository.findByName(req.getType2());
////        if (workoutType2 == null) {
////            WorkoutType workoutType = new WorkoutType();
////            workoutType.setName(req.getType1());
////            workoutType.setParentType(workoutType1);
////            workoutType2 = workoutTypeRepository.save(workoutType);
////        }
////        WorkoutType workoutType3 = workoutTypeRepository.findByName(req.getType3());
////        if (workoutType3 == null) {
////            WorkoutType workoutType = new WorkoutType();
////            workoutType.setName(req.getType1());
////            workoutType.setParentType(workoutType2);
////            workoutType3 = workoutTypeRepository.save(workoutType);
////        }
////
//    Workout workout = new Workout();
//    workout.setType(req.getType());
//    workout.setName(req.getName());
////        workout.setExercises(req.getExercises());
//
//    return workoutRepository.save(workout);
//}
