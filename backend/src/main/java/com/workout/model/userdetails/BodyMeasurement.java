package com.workout.model.userdetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.workout.enums.BMIStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BodyMeasurement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double weight;  // User's weight at the time of entry
    private double height;  // User's height in meters
    private double bmi;     // BMI value at the time of entry

    @Enumerated(EnumType.STRING)
    private BMIStatus bmiStatus; // Enum representing BMI category

    private LocalDateTime dateRecorded;

    @ManyToOne
    @JoinColumn(name = "user_progress_id", nullable = false)
    @JsonBackReference
    private UserProgress userProgress;

    // Method to update weight, height, BMI, and BMI status
    public void updateBodyMeasurement(double weight, double height) {
        this.weight = weight;
        this.height = height;
        this.bmi = calculateBMI(weight, height);
        this.bmiStatus = determineBMIStatus(this.bmi);
        this.dateRecorded = LocalDateTime.now();
    }

    // BMI Calculation: weight (kg) / (height (m) * height (m))
    private double calculateBMI(double weight, double height) {
        double heightInMetres = height/100;
        return (height > 0) ? weight / (heightInMetres * heightInMetres) : 0;
    }

    // Determine BMI status based on BMI value
    private BMIStatus determineBMIStatus(double bmi) {
        if (bmi < 18.5) return BMIStatus.UNDERWEIGHT;
        if (bmi < 25.0) return BMIStatus.NORMAL_WEIGHT;
        if (bmi < 30.0) return BMIStatus.OVERWEIGHT;
        return BMIStatus.OBESE;
    }
}
