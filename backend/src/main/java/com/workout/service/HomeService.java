package com.workout.service;

import com.workout.model.home.Home;
import com.workout.model.home.HomeCategory;

import java.util.List;

public interface HomeService {
    Home createHomePage(List<HomeCategory> homeCategoryList);
}
