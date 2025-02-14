package com.workout.model.userdetails;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Exercise1RM {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String exerciseName;

    private double oneRepMax;

    private LocalDateTime dateRecorded;

    @ManyToOne
    @JoinColumn(name = "user_progress_id", nullable = false)
    private UserProgress userProgress;
}
