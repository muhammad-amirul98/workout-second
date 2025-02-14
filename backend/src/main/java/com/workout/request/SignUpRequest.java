package com.workout.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class SignUpRequest {

    private String email;

    private String fullName;

    private String otp;
}
