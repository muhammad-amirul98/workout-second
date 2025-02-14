package com.workout.request;

import lombok.Data;

import java.util.Set;

@Data
public class CreateReviewRequest {
    private String reviewText;
    private double reviewRating;
    private Set<String> productImages;
}
