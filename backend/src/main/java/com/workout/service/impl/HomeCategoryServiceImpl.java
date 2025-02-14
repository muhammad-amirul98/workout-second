package com.workout.service.impl;

import com.workout.model.home.HomeCategory;
import com.workout.repository.HomeCategoryRepository;
import com.workout.service.HomeCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HomeCategoryServiceImpl implements HomeCategoryService {

    private final HomeCategoryRepository homeCategoryRepository;


    @Override
    public HomeCategory createHomeCategory(HomeCategory homeCategory) {
        return homeCategoryRepository.save(homeCategory);
    }

    @Override
    public List<HomeCategory> createCategories(List<HomeCategory> homeCategories) {
        return homeCategoryRepository.saveAll(homeCategories);
    }

    @Override
    public HomeCategory updateHomeCategory(HomeCategory homeCategory, Long id) throws Exception {
        HomeCategory existingHomeCategory = homeCategoryRepository.findById(id).
                orElseThrow(() -> new Exception("Home Category Not Found."));
        if (homeCategory.getImage() != null) {
            existingHomeCategory.setImage(homeCategory.getImage());
        }
        if (homeCategory.getCategoryid() != null) {
            existingHomeCategory.setCategoryid(homeCategory.getCategoryid());
        }
        return homeCategoryRepository.save(existingHomeCategory);
    }

    @Override
    public List<HomeCategory> getAllHomeCategories() {
        return homeCategoryRepository.findAll();
    }
}
