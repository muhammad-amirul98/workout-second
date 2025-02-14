package com.workout.model.workouts;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ExerciseSet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int reps;

    private double weight;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    // Many Sets belong to one Exercise
    @ManyToOne
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;

    public double getTotalWeightLifted() {
        return reps * weight;
    }


}
