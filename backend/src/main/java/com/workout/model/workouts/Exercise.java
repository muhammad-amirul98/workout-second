package com.workout.model.workouts;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "workout_id")
    private Workout workout;

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ExerciseSet> exerciseSets = new HashSet<>();

    public double getTotalWeightLifted() {
        return exerciseSets.stream()
                .mapToDouble(ExerciseSet::getTotalWeightLifted)
                .sum();
    }

}
