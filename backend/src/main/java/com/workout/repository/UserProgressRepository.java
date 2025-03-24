package com.workout.repository;

import com.workout.model.userdetails.BodyMeasurement;
import com.workout.model.userdetails.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
}
