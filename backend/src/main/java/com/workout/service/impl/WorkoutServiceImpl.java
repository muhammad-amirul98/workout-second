package com.workout.service.impl;

import com.workout.exception.WorkoutException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.*;
import com.workout.repository.*;
import com.workout.request.CreateExerciseRequest;
import com.workout.request.CreateSetRequest;
import com.workout.request.CreateWorkoutRequest;
import com.workout.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.hibernate.jdbc.Work;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutLogRepository workoutLogRepository;
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
    public WorkoutSet addSetToExercise(Long exerciseId, Long workoutId, User user, CreateSetRequest set) throws Exception {
        Exercise exercise = exerciseRepository.findById(exerciseId).
                orElseThrow(() -> new Exception("Exercise Not Found"));

        Workout workout = workoutRepository.findById(workoutId).
                orElseThrow(() -> new Exception("Workout Not Found"));

        WorkoutExercise workoutExercise = workoutExerciseRepository.findByWorkoutAndExercise(workout, exercise);
        WorkoutSet workoutSet = new WorkoutSet();
        workoutSet.setWorkoutExercise(workoutExercise);
        workoutSet.setSetNumber(set.getSetNumber());
        workoutSet.setReps(set.getReps());
        workoutSet.setWeight(set.getWeight());

        return workoutSetRepository.save(workoutSet);
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
