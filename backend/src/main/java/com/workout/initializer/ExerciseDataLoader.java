package com.workout.initializer;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.workout.model.workouts.Exercise;
import com.workout.repository.ExerciseRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.io.InputStream;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ExerciseDataLoader {
    private final ExerciseRepository exerciseRepository;
    private final ObjectMapper objectMapper;


    @PostConstruct
    @Transactional
    public void loadExercises() {
        try {
            // Load JSON file
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("preset_exercises.json");
            if (inputStream == null) {
                throw new RuntimeException("Failed to load preset_exercises.json");
            }

            // Convert JSON to list of Exercise objects
            List<Exercise> exercises = objectMapper.readValue(inputStream, new TypeReference<>() {});

            // Save to database, avoiding duplicates
            for (Exercise exercise : exercises) {
                if (exerciseRepository.findByName(exercise.getName()) == null) {
                    exerciseRepository.save(exercise);
                }
            }

            System.out.println("✅ Preset exercises loaded successfully!");
        } catch (Exception e) {
            throw new RuntimeException("❌ Error loading exercises: " + e.getMessage(), e);
        }
    }
}
