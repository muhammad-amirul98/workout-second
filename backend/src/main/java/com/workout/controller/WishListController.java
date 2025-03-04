package com.workout.controller;

import com.workout.exception.ProductException;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Product;
import com.workout.model.ecommerce.WishList;
import com.workout.model.userdetails.User;
import com.workout.request.CartItemRequest;
import com.workout.response.ApiResponse;
import com.workout.service.CartService;
import com.workout.service.ProductService;
import com.workout.service.UserService;
import com.workout.service.WishListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/wishlist")
public class WishListController {

    private final ProductService productService;
    private final WishListService wishListService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<WishList> getWishList(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws ProductException, UserException {


        User user = userService.findUserByJwtToken(jwt);
        WishList wishList = wishListService.getWishListByUserId(user);
        return ResponseEntity.ok(wishList);
    }


    @PostMapping("/{productId}")
    public ResponseEntity<WishList> addProductToWishList(@PathVariable Long productId,
                                                         @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws ProductException, UserException {

        Product product = productService.findProductById(productId);
        User user = userService.findUserByJwtToken(jwt);
        WishList wishList = wishListService.addProductToWishList(user, product);
        return ResponseEntity.ok(wishList);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteProductFromWishList(@PathVariable Long productId,
                                                         @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws ProductException, UserException {

        Product product = productService.findProductById(productId);
        User user = userService.findUserByJwtToken(jwt);
        wishListService.deleteProductFromWishList(user, product);
        return ResponseEntity.noContent().build();
    }

}
