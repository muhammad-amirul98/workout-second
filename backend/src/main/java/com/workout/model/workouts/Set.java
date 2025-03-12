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
@Table(name = "workout_set")
public class Set {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private int reps;

    private double weight;

    @ManyToOne
    private Exercise exercise;

    public double getTotalWeightLiftedInSet() {
        return reps * weight;
    }


}
