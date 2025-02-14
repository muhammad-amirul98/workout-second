package com.workout.service;

import com.workout.request.SignInRequest;
import com.workout.request.SignUpRequest;
import com.workout.response.AuthResponse;

public interface AuthService {

    String signUp(SignUpRequest signUpRequest) throws Exception;
    String adminSignUp(SignUpRequest signUpRequest) throws Exception;
    void sendOTP(String email) throws Exception;
    AuthResponse signIn(SignInRequest signInRequest);
}
