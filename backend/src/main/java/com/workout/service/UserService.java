package com.workout.service;

import com.workout.exception.UserException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.Workout;
import com.workout.request.SignInRequest;
import com.workout.request.SignUpRequest;
import com.workout.response.AuthResponse;

import java.util.List;
import java.util.Set;

public interface UserService {

    User findUserByJwtToken(String jwt) throws UserException;
    User findUserByEmail(String email) throws UserException;
    void deleteUser(Long id) throws UserException;
    User getUserById(Long id) throws UserException;
    User updateUser(Long id, User updatedUser) throws UserException;
    List<User> getAllUsers() throws UserException;
    void followUser(Long followerId, Long followingId);
    void unfollowUser(Long followerId, Long followingId);
    List<User> getFollowers(Long userId);
    List<User> getFollowing(Long userId);
    List<Workout> getUserWorkoutHistory(Long userId);




}
