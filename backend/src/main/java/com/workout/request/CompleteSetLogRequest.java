package com.workout.request;

import lombok.Data;

@Data
public class CompleteSetLogRequest {
    private int reps;
    private Long weight;

}
