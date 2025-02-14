package com.workout.controller;

import com.workout.model.home.Home;
import com.workout.model.home.HomeCategory;
import com.workout.service.HomeCategoryService;
import com.workout.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class HomeCategoryController {

    private final HomeCategoryService homeCategoryService;
    private final HomeService homeService;

    @PostMapping("/home/categories")
    public ResponseEntity<Home> createHomeCategories(
            @RequestBody List<HomeCategory> homeCategoryList
    ) {
        List<HomeCategory> homeCategories = homeCategoryService.createCategories(homeCategoryList);
        Home home = homeService.createHomePage(homeCategories);
        return new ResponseEntity<>(home, HttpStatus.ACCEPTED);
    }

    @GetMapping("/admin/home-category")
    public ResponseEntity<List<HomeCategory>> getHomeCategory() {
        List<HomeCategory> homeCategories = homeCategoryService.getAllHomeCategories();
        return new ResponseEntity<>(homeCategories, HttpStatus.OK);
    }

    @PatchMapping("/admin/home-category/{id}")
    public ResponseEntity<HomeCategory> updateHomeCategory(
            @PathVariable Long id,
            @RequestBody HomeCategory homeCategory) throws Exception {
        HomeCategory updatedCategory = homeCategoryService.updateHomeCategory(homeCategory, id);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

}
