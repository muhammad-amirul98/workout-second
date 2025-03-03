package com.workout.controller;

import com.workout.exception.UserException;
import com.workout.model.userdetails.Address;
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
    public ResponseEntity<User> getUserHandler(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {

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

    @GetMapping("/addresses")
    public ResponseEntity<List<Address>> getUserAddresses
            (@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        List<Address> addresses = user.getAddresses();
        return ResponseEntity.ok(addresses);
    }

    @PostMapping("/addresses")
    public ResponseEntity<List<Address>> addAddress(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
            @RequestBody Address newAddress) throws UserException {
        // Find the user by JWT token
        User user = userService.findUserByJwtToken(jwt);

        // Save the user with the new address (assuming you have a method to save user)
        userService.addAddress(user, newAddress);

        // Return the updated list of addresses
        return ResponseEntity.ok(user.getAddresses());
    }

    @PutMapping("/addresses")
    public ResponseEntity<Address> editAddress(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
            @RequestParam Long addressId,
            @RequestBody Address newAddress) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        Address updatedAddress = userService.editAddress(user, newAddress, addressId);

        return ResponseEntity.ok(updatedAddress);
    }

    @DeleteMapping("/addresses")
    public ResponseEntity<Void> deleteAddress(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt,
            @RequestParam Long addressId
           ) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        userService.deleteAddress(user, addressId);

        return ResponseEntity.noContent().build();
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
