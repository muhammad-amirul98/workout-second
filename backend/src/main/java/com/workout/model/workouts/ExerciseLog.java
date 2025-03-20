package com.workout.model.workouts;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExerciseLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Exercise exercise;

    @ManyToOne
    @JoinColumn(name = "workout_log_id")
    @JsonBackReference
    private WorkoutLog workoutLog;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    @OneToMany(mappedBy = "exerciseLog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<SetLog> setLogs = new ArrayList<>();

    public double getTotalWeightLiftedInExercise() {
        return setLogs.stream()
                .mapToDouble(SetLog::getTotalWeightLiftedInSet)
                .sum();
    }

    public double getMaxWeightPerformed() {
        return setLogs.stream()
                .mapToDouble(SetLog::getWeight) // Assuming SetLog has a getWeight() method
                .max()
                .orElse(0.0); // Default to 0 if no sets exist
    }
}
