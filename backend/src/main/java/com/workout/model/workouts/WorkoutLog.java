package com.workout.model.workouts;

import com.workout.enums.WorkoutStatus;
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
public class WorkoutLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Workout workout;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    @OneToMany(mappedBy = "workoutLog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ExerciseLog> exerciseLogs = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private WorkoutStatus workoutStatus = WorkoutStatus.IN_PROGRESS;

    private double totalWeightLifted = getTotalWeightLiftedInWorkout();

    public double getTotalWeightLiftedInWorkout() {
        return exerciseLogs.stream()
                .mapToDouble(com.workout.model.workouts.ExerciseLog::getTotalWeightLiftedInExercise)
                .sum();
    }

}
