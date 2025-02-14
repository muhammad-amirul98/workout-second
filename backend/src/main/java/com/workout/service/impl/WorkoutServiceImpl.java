package com.workout.service.impl;

import com.workout.exception.WorkoutException;
import com.workout.model.ecommerce.Category;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.Workout;
import com.workout.model.workouts.WorkoutType;
import com.workout.repository.WorkoutRepository;
import com.workout.repository.WorkoutTypeRepository;
import com.workout.request.CreateWorkoutRequest;
import com.workout.service.WorkoutService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final WorkoutTypeRepository workoutTypeRepository;

    @Override
    public Workout createWorkout(CreateWorkoutRequest req, User user) {
        WorkoutType workoutType1 = workoutTypeRepository.findByName(req.getType1());
        if (workoutType1 == null) {
            WorkoutType workoutType = new WorkoutType();
            workoutType.setName(req.getType1());
            workoutType1 = workoutTypeRepository.save(workoutType);
        }
        WorkoutType workoutType2 = workoutTypeRepository.findByName(req.getType2());
        if (workoutType2 == null) {
            WorkoutType workoutType = new WorkoutType();
            workoutType.setName(req.getType1());
            workoutType.setParentType(workoutType1);
            workoutType2 = workoutTypeRepository.save(workoutType);
        }
        WorkoutType workoutType3 = workoutTypeRepository.findByName(req.getType3());
        if (workoutType3 == null) {
            WorkoutType workoutType = new WorkoutType();
            workoutType.setName(req.getType1());
            workoutType.setParentType(workoutType2);
            workoutType3 = workoutTypeRepository.save(workoutType);
        }

        Workout workout = new Workout();
        workout.setType(workoutType3);
        workout.setName(req.getName());
        workout.setExercises(req.getExercises());

        return workoutRepository.save(workout);
    }

    public Workout startWorkout(Long workoutId) throws WorkoutException {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));
        workout.setDate(LocalDate.now());
        workout.setTimeStarted(LocalDateTime.now());
        return workoutRepository.save(workout);
    }

    public Workout endWorkout(Long workoutId) throws WorkoutException {
        Workout workout = workoutRepository.findById(workoutId)
                .orElseThrow(() -> new WorkoutException("Workout not found with ID: " + workoutId));
        workout.setTimeCompleted(LocalDateTime.now());
        return workoutRepository.save(workout);
    }

    @Override
    public void deleteWorkout(Long workoutId) {

    }

    @Override
    public Workout updateWorkout(Long workoutId, Workout workout) {
        return null;
    }

    @Override
    public Workout findWorkoutById(Long workoutId) {
        return null;
    }

    @Override
    public List<Workout> searchWorkouts() {
        return List.of();
    }

    @Override
    public Page<Workout> getAllWorkouts(String type) {
        return null;
    }

    @Override
    public List<Workout> getWorkoutByUserId(Long userId) {
        return List.of();
    }
}
