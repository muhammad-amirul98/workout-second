package com.workout.model.userdetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "userProgress", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<BodyMeasurement> bodyMeasurements = new HashSet<>();

    @OneToMany(mappedBy = "userProgress", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Exercise1RM> exercise1RMs = new HashSet<>();

    private int totalWorkouts = 0;
}

