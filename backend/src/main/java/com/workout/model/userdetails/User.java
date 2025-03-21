package com.workout.model.userdetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.workout.enums.UserRole;
import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.WishList;
import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.Workout;
import com.workout.model.workouts.WorkoutLog;
import com.workout.model.workouts.WorkoutWatchList;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false, unique = true)
    private String email;

    private String fullName;

    private String mobile;

    @OneToOne
    private WorkoutLog currentWorkout;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<WorkoutLog> workoutLogs = new HashSet<>();

    @Embedded
    private BankDetails bankDetails = new BankDetails();

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_USER;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Address> addresses = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Workout> workouts = new HashSet<>();



    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_progress_id", unique = true)
    @JsonManagedReference
    private UserProgress userProgress;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Order> orders = new HashSet<>();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Cart cart;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private WishList wishList;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private WorkoutWatchList workoutWatchList;

}
