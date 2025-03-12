package com.workout.model.workouts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.workout.enums.WorkoutStatus;
import com.workout.model.userdetails.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String type;

    @ManyToMany
    @JoinTable(
            name = "workout_exercises", // Name of the join table
            joinColumns = @JoinColumn(name = "workout_id"), // FK to Workout
            inverseJoinColumns = @JoinColumn(name = "exercise_id") // FK to Exercise
    )
    private List<Exercise> exercises = new ArrayList<>();

    private LocalDateTime createdOn = LocalDateTime.now();

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<WorkoutLog> workoutLogs = new HashSet<>();

    private double totalWeightLifted = getTotalWeightLiftedInWorkout();

    public double getTotalWeightLiftedInWorkout() {
        return exercises.stream()
                .mapToDouble(com.workout.model.workouts.Exercise::getTotalWeightLiftedInExercise)
                .sum();
    }
}
