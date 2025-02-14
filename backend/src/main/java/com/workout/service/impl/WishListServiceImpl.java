package com.workout.service.impl;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Product;
import com.workout.model.ecommerce.WishList;
import com.workout.model.userdetails.User;
import com.workout.repository.CartItemRepository;
import com.workout.repository.CartRepository;
import com.workout.repository.UserRepository;
import com.workout.repository.WishListRepository;
import com.workout.service.CartService;
import com.workout.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;

    @Override
    public WishList getWishListByUserId(User user) {
        return wishListRepository.findByUserId(user.getId());
    }

    @Override
    public WishList addProductToWishList(User user, Product product) {
        WishList wishList = user.getWishList();
        if (wishList.getProducts().contains(product)) {
            wishList.getProducts().remove((product));
        } else {
            wishList.getProducts().add(product);
        }
        return wishListRepository.save(wishList);
    }
}
