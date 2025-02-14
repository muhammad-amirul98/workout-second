package com.workout.controller;

import com.workout.exception.UserException;
import com.workout.model.userdetails.User;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> createUserHandler(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {

        User user = userService.findUserByJwtToken(jwt);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) throws UserException {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() throws UserException {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) throws UserException {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping()
    public ResponseEntity<User> updateUser(@RequestHeader("Authorization") String jwt, @RequestBody User updatedUser) throws UserException {
        // Call the service to update the user
        User existingUser = userService.findUserByJwtToken(jwt);
        User savedUser = userService.updateUser(existingUser.getId(), updatedUser);

        // Return response indicating the update was successful
        return ResponseEntity.ok(savedUser);
    }




}
