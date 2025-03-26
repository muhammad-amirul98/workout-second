package com.workout.model;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookModel {
    private Long id;
    private String title;
    private String description;
    private String genre;
    private LocalDate dateOfPublication;
    private String author;
}
