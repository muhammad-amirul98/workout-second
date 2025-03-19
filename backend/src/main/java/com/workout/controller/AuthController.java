package com.workout.controller;

import com.workout.enums.UserRole;
import com.workout.model.ecommerce.VerificationCode;
import com.workout.request.SignInRequest;
import com.workout.request.SignUpRequest;
import com.workout.response.ApiResponse;
import com.workout.response.AuthResponse;
import com.workout.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUpHandler(@RequestBody SignUpRequest signUpRequest) throws Exception {
        String jwt = authService.signUp(signUpRequest);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Successful Registration");
        res.setRole(UserRole.ROLE_USER);

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/signup/admin")
    public ResponseEntity<AuthResponse> adminSignUpHandler(@RequestBody SignUpRequest signUpRequest) throws Exception {
        String jwt = authService.adminSignUp(signUpRequest);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Successful Registration");
        res.setRole(UserRole.ROLE_ADMIN);

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signInHandler(@RequestBody SignInRequest signInRequest) throws Exception {
        AuthResponse authResponse = authService.signIn(signInRequest);
        return ResponseEntity.status(HttpStatus.OK).body(authResponse);

    }

    @PostMapping("/otp")
    public ResponseEntity<ApiResponse> sendOTPHandler(@RequestBody String email) throws Exception {
        authService.sendOTP(email);
        ApiResponse res = new ApiResponse();
        res.setMessage("OTP sent successfully");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(res);
    }

}
