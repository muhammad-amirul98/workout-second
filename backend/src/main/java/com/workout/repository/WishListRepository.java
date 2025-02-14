package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    WishList findByUserId(Long userId);

}
