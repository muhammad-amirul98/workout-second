package com.workout.request;

import lombok.Data;

@Data
public class CreateExerciseRequest {
    private String name;
    private String type;
    private String description;
    private String[] images;
//    private Set<Exercise> exercises;
////    private String type1;
////    private String type2;
////    private String type3;
}
