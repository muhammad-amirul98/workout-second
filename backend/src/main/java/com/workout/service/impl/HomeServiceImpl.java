package com.workout.service.impl;

import com.workout.enums.HomeCategorySection;
import com.workout.model.home.Home;
import com.workout.model.home.HomeCategory;
import com.workout.service.HomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomeServiceImpl implements HomeService {

    @Override
    public Home createHomePage(List<HomeCategory> homeCategoryList) {
        List<HomeCategory> gridCategories = homeCategoryList.stream()
                .filter(category -> category.getSection() == HomeCategorySection.GRID)
                .toList();

        List<HomeCategory> shopCategories = homeCategoryList.stream()
                .filter(category -> category.getSection() == HomeCategorySection.SHOP)
                .toList();

        List<HomeCategory> electricCategories = homeCategoryList.stream()
                .filter(category -> category.getSection() == HomeCategorySection.ELECTRIC)
                .toList();

        Home home = new Home();
        home.setGrid(gridCategories);
        home.setShop(shopCategories);
        home.setElectric(electricCategories);
        return home;
    }
}
