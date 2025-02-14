package com.workout.model.workouts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.workout.model.userdetails.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WorkoutWatchList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonBackReference
    private User user;

    @ManyToMany
    private Set<Workout> workouts = new HashSet<>();

    public WorkoutWatchList(User newUser) {
        this.user = newUser;
    }
}
