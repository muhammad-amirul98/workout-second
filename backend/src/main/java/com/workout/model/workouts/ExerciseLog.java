package com.workout.model.workouts;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

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
    private WorkoutLog workoutLog;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    @OneToMany(mappedBy = "exerciseLog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<SetLog> setLogs = new HashSet<>();

    public double getTotalWeightLiftedInExercise() {
        return setLogs.stream()
                .mapToDouble(com.workout.model.workouts.SetLog::getTotalWeightLiftedInSet)
                .sum();
    }

}
