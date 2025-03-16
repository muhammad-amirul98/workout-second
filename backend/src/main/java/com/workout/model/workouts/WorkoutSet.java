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

    private int setNumber;

    private int reps; //planned reps

    private double weight; // planned weight

    private int actualReps;

    private double actualWeight;

    @ManyToOne
    @JoinColumn(name = "workout_exercise_id")
    @JsonBackReference
    private WorkoutExercise workoutExercise;

    @Column(columnDefinition = "TEXT")
    private String setNotes;

    public double getTotalExpectedWeightLiftedInSet() {
        return reps * weight;
    }

    public double getTotalActualWeightLiftedInSet() {
        return actualReps * actualWeight;
    }

}
