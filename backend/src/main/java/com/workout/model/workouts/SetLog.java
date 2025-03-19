package com.workout.model.workouts;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SetLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int reps;

    private double weight;

    private boolean isComplete = false;

    @ManyToOne
    @JoinColumn(name = "exercise_log_id")
    @JsonBackReference
    private ExerciseLog exerciseLog;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    public double getTotalWeightLiftedInSet() {
        return reps * weight;
    }


}
