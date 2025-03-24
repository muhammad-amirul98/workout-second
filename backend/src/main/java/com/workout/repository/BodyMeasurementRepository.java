package com.workout.repository;

import com.workout.model.userdetails.BodyMeasurement;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BodyMeasurementRepository extends JpaRepository<BodyMeasurement, Long> {
}
