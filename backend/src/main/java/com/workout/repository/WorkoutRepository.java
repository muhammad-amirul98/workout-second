package com.workout.repository;

import com.workout.model.userdetails.User;
import com.workout.model.workouts.Exercise;
import com.workout.model.workouts.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {


    @Query("SELECT w FROM Workout w " +
            "WHERE LOWER(w.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(w.type) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Workout> searchWorkout(@Param("query") String query);
}
