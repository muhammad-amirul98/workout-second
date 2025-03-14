package com.workout.model.workouts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutSet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int setNumber = 1;

    private int reps = 0;

    private double weight = 0;

    @ManyToOne
    @JoinColumn(name = "workout_exercise_id")
    @JsonBackReference
    private WorkoutExercise workoutExercise;

    @Column(columnDefinition = "TEXT")
    private String setNotes;

    public double getTotalWeightLiftedInSet() {
        return reps * weight;
    }

}
