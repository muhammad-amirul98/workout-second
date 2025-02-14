package com.workout.repository;

import com.workout.model.ecommerce.WishList;
import com.workout.model.workouts.WorkoutWatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutWatchListRepository extends JpaRepository<WorkoutWatchList, Long> {

}
