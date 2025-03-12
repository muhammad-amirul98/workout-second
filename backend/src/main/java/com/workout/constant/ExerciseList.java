package com.workout.constant;

import java.util.List;
import java.util.Map;

public class ExerciseList {
    public static final List<Map<String, String>> EXERCISE_LIST = List.of(
            Map.of("name", "Bicep Curl", "type", "biceps"),
            Map.of("name", "Tricep Dips", "type", "triceps"),
            Map.of("name", "Bench Press", "type", "chest"),
            Map.of("name", "Squat", "type", "legs"),
            Map.of("name", "Deadlift", "type", "back"),
            Map.of("name", "Pull-Up", "type", "back"),
            Map.of("name", "Overhead Press", "type", "shoulders"),
            Map.of("name", "Lateral Raise", "type", "shoulders"),
            Map.of("name", "Lunges", "type", "legs"),
            Map.of("name", "Crunches", "type", "abs")
    );
}
