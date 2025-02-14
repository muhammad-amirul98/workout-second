package com.workout.request;

import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.WorkoutType;
import lombok.Data;

import java.util.Set;

@Data
public class CreateWorkoutRequest {
    private String name;
    private Set<Exercise> exercises;
    private String type1;
    private String type2;
    private String type3;
}
