package com.workout.service.impl;

import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.*;
import com.workout.repository.*;
import com.workout.request.CreateExerciseRequest;
import com.workout.request.CreateWorkoutRequest;
import com.workout.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.hibernate.jdbc.Work;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutLogRepository workoutLogRepository;
    private final UserRepository userRepository;


    @Override
    public Workout createWorkout(CreateWorkoutRequest req, User user) {
        Workout workout = new Workout();
        workout.setName(req.getName());
        workout.setType(req.getType());
        workout.setUser(user);
        return workoutRepository.save(workout);
    }



    @Override
    public Workout addExerciseToWorkout(String exerciseName, User user, Long workoutId) throws Exception {

        Exercise exercise = exerciseRepository.findByName(exerciseName);

        Workout workout = workoutRepository.findById(workoutId).
                orElseThrow(() -> new Exception("Workout Not Found"));

        if (!workout.getUser().equals(user)) {
            throw new Exception("You are not authorized to modify this workout");
        }

        if (!workout.getExercises().contains(exercise)) {
            workout.getExercises().add(exercise);
            exercise.getWorkouts().add(workout); // ensures bidirectional mapping
        }

        return workoutRepository.save(workout);
    }

    @Override
    public Exercise createExercise(CreateExerciseRequest req, User user) {
        Exercise exercise = new Exercise();
        exercise.setName(req.getName());
        exercise.setType(req.getType());
        exercise.setUser(user);
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
    public Exercise addSetToExercise(Long exerciseId, User user, Set set) throws Exception {
        Exercise exercise = exerciseRepository.findById(exerciseId).
                orElseThrow(() -> new Exception("Exercise Not Found"));

        // Ensure the user has permission to modify at least one associated workout
        boolean isAuthorized = exercise.getWorkouts().stream()
                .anyMatch(workout -> workout.getUser().equals(user));

        if (!isAuthorized) {
            throw new Exception("You are not authorized to modify this exercise");
        }

        set.setExercise(exercise);
        exercise.getSets().add(set);
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
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));
        if (!user.getWorkouts().contains(workout)) {
            throw new WorkoutException("Unauthorized to start workout");
        };
        WorkoutLog workoutLog = new WorkoutLog();
        workoutLog.setTimeStarted(LocalDateTime.now());
        workoutLog.setWorkout(workout);
        return workoutLogRepository.save(workoutLog);
    }



    @Override
    public WorkoutLog endWorkout(Long workoutLogId, User user) throws WorkoutException {
        WorkoutLog workoutLog = workoutLogRepository.findById(workoutLogId)
                .orElseThrow(() -> new WorkoutException("Workout Log not found with ID: " + workoutLogId));
        Workout workout = workoutLog.getWorkout();
        if (!user.getWorkouts().contains(workout)) {
            throw new WorkoutException("Unauthorized to start workout");
        };
        workoutLog.setTimeCompleted(LocalDateTime.now());
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
        workout.getExercises().clear();
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
    public Workout findWorkoutById(Long workoutId) throws WorkoutException {
        return workoutRepository.findById(workoutId)
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
    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public java.util.Set<Workout> getWorkoutsByUserId(Long userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found with ID: " + userId));
        return user.getWorkouts();
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
