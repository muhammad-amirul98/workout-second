package com.workout.model.home;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.List;

@Data
public class Home {

    private List<HomeCategory> grid;

    private List<HomeCategory> workout;

    private List<HomeCategory> chart;

    private List<HomeCategory> shop;

    private List<HomeCategory> feed;

    private List<HomeCategory> electric;
}
