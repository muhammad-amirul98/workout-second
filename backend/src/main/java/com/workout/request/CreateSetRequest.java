package com.workout.request;

import lombok.Data;

@Data
public class CreateSetRequest {
    private int setNumber;
    private int plannedReps;
    private double plannedWeight;
}
