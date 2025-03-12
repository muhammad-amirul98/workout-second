package com.workout.repository;

import com.workout.model.workouts.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    Exercise findByName(String name);

    @Query("SELECT e.name FROM Exercise e")
    List<String> findAllExerciseNames();

    @Query("SELECT e FROM Exercise e " +
            "WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :query, '%')) " +
            "OR LOWER(e.type) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Exercise> searchExercises(@Param("query") String query);
}
