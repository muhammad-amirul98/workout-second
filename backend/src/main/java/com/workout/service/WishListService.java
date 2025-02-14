package com.workout.service;

import com.workout.model.ecommerce.Product;
import com.workout.model.ecommerce.WishList;
import com.workout.model.userdetails.User;

public interface WishListService {

    WishList getWishListByUserId(User user);
    WishList addProductToWishList(User user, Product product);
}
