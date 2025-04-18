package com.workout.model.workouts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.workout.enums.WorkoutStatus;
import com.workout.model.userdetails.User;
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
public class WorkoutLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonBackReference
    private Workout workout;

    @ManyToOne
    @JsonBackReference
    private User user;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    @OneToMany(mappedBy = "workoutLog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<ExerciseLog> exerciseLogs = new ArrayList<>();

    public boolean getAllSetsCompleted() {
        return exerciseLogs != null && exerciseLogs.stream()
                .flatMap(exerciseLog -> exerciseLog.getSetLogs().stream())
                .allMatch(SetLog::isComplete);
    }

    @Enumerated(EnumType.STRING)
    private WorkoutStatus workoutStatus = WorkoutStatus.IN_PROGRESS;

    public double getTotalWeightLiftedInWorkout() {
        return exerciseLogs.stream()
                .mapToDouble(com.workout.model.workouts.ExerciseLog::getTotalWeightLiftedInExercise)
                .sum();
    }

}
