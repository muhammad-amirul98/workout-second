package com.workout.model.workouts;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.workout.enums.WorkoutStatus;
import com.workout.model.userdetails.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    private WorkoutType type;

    @OneToMany(mappedBy = "workout", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Exercise> exercises = new HashSet<>();

    private LocalDate date;

    private LocalDateTime timeStarted;

    private LocalDateTime timeCompleted;

    @Enumerated(EnumType.STRING)
    private WorkoutStatus status = WorkoutStatus.IN_PROGRESS;
}
