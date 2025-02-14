package com.workout.request;

import com.workout.model.workouts.Exercise;
import lombok.Data;

import java.util.Set;

@Data
public class CreateProductRequest {
    String name;
    String description;
    Set<String> images;
    String category1;
    String category2;
    String category3;
    String brand;
    double price;
    int stock;
}
