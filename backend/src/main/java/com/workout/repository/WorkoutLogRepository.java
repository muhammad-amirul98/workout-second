package com.workout.repository;

import com.workout.model.userdetails.User;
import com.workout.model.workouts.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
    List<WorkoutLog> findByUser(User user);
}
