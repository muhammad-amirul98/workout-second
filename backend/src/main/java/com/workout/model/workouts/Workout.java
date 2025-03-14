package com.workout.model.workouts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.workout.enums.WorkoutStatus;
import com.workout.model.userdetails.User;
import com.workout.utils.DateTimeFormater;
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
    @JsonIgnore
    private User user;

    private String type;

    private String createdOn = DateTimeFormater.formatDateTime(LocalDateTime.now());

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<WorkoutLog> workoutLogs = new HashSet<>();

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<WorkoutExercise> workoutExercises = new ArrayList<>();

    private double totalWeightLifted = getTotalWeightLiftedInWorkout();

    @JsonIgnore
    public double getTotalWeightLiftedInWorkout() {
        return workoutExercises.stream()
                .mapToDouble(WorkoutExercise::getTotalWeightLiftedInExercise)
                .sum();
    }
}
