package com.workout.model.workouts;

import com.workout.model.userdetails.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

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

    @Column(unique = true)
    private String name;

    private String type;

    private String description;

    private java.util.Set<String> images = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(mappedBy = "exercises") // Reference the field name in Workout
    private List<Workout> workouts = new ArrayList<>();

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private java.util.Set<Set> sets = new HashSet<>();

    public double getTotalWeightLiftedInExercise() {
        return sets.stream()
                .mapToDouble(Set::getTotalWeightLiftedInSet)
                .sum();
    }

}
