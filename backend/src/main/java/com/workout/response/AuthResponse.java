package com.workout.response;

import com.workout.enums.UserRole;
import com.workout.model.userdetails.User;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private UserRole role;
}
