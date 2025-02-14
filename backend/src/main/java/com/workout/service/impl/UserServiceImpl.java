package com.workout.service.impl;

import com.workout.config.JwtProvider;
import com.workout.exception.UserException;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.Workout;
import com.workout.repository.UserRepository;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws UserException {
        return userRepository.findByEmail(jwtProvider.getEmailFromJwtToken(jwt))
                .orElseThrow(() -> new UserException("User not found for the given JWT"));
    }


    @Override
    public User findUserByEmail(String email) throws UserException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserException("User not found with email: " + email));
    }

    @Override
    public void deleteUser(Long id) throws UserException {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserException("User not found with ID: " + id));

        userRepository.delete(user);
    }

    @Override
    public User getUserById(Long id) throws UserException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserException("User not found with ID: " + id));
    }


    @Override
    public User updateUser(Long id, User updatedUser) throws UserException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserException("User not found with id: " + id));

        // Update fields if not null (to avoid overwriting existing data with null)
        if (updatedUser.getFullName() != null) {
            existingUser.setFullName(updatedUser.getFullName());
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }
        if (updatedUser.getMobile() != null) {
            existingUser.setMobile(updatedUser.getMobile());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(updatedUser.getPassword());
        }
        if (updatedUser.getRole() != null) {
            existingUser.setRole(updatedUser.getRole());
        }
        if (updatedUser.getBankDetails() != null) {
            existingUser.setBankDetails(updatedUser.getBankDetails());
        }
        if (updatedUser.getAddresses() != null && !updatedUser.getAddresses().isEmpty()) {
            existingUser.setAddresses(updatedUser.getAddresses());
        }
        if (updatedUser.getWorkouts() != null && !updatedUser.getWorkouts().isEmpty()) {
            existingUser.setWorkouts(updatedUser.getWorkouts());
        }
        if (updatedUser.getOrders() != null && !updatedUser.getOrders().isEmpty()) {
            existingUser.setOrders(updatedUser.getOrders());
        }
        if (updatedUser.getUserProgress() != null) {
            existingUser.setUserProgress(updatedUser.getUserProgress());
        }
        if (updatedUser.getWorkoutWatchList() != null) {
            existingUser.setWorkoutWatchList(updatedUser.getWorkoutWatchList());
        }
        if (updatedUser.getWishList() != null) {
            existingUser.setWishList(updatedUser.getWishList());
        }

        return userRepository.save(existingUser);
    }

    @Override
    public List<User> getAllUsers() throws UserException {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new UserException("No users found");
        }
        return users;
    }


    @Override
    public void followUser(Long followerId, Long followingId) {

    }

    @Override
    public void unfollowUser(Long followerId, Long followingId) {

    }

    @Override
    public List<User> getFollowers(Long userId) {
        return List.of();
    }

    @Override
    public List<User> getFollowing(Long userId) {
        return List.of();
    }

    @Override
    public List<Workout> getUserWorkoutHistory(Long userId) {
        return List.of();
    }


}
