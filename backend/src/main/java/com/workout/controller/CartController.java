package com.workout.controller;

import com.workout.exception.ProductException;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.CartItem;
import com.workout.model.ecommerce.Product;
import com.workout.model.userdetails.User;
import com.workout.request.CartItemRequest;
import com.workout.response.ApiResponse;
import com.workout.service.CartService;
import com.workout.service.ProductService;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;
    private final UserService userService;
    private final ProductService productService;


    @GetMapping
    public ResponseEntity<Cart> findUserCart(@RequestHeader(HttpHeaders.AUTHORIZATION) String jwt) throws UserException {
        User user = userService.findUserByJwtToken(jwt);

        Cart cart = cartService.findUserCart(user);

        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<CartItem> addItemToCart(@RequestParam Long productId,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException, ProductException {

        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);
        CartItem cartItem = cartService.addCartItem(user, product);

        return new ResponseEntity<>(cartItem, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<ApiResponse> removeItemFromCart(@RequestParam Long productId,
                                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException, ProductException {

        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);
        cartService.removeCartItem(user, product);

        return ResponseEntity.noContent().build(); // HTTP 204 No Content when item is removed
    }

    @PutMapping("/update")
    public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody CartItemRequest req,
                                                          @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt)
            throws UserException, ProductException {

        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(req.getProductId());
        CartItem cartItem = cartService.updateCartItemQuantity(user, product, req.getQuantity());
        return new ResponseEntity<>(cartItem, HttpStatus.ACCEPTED);

    }





}
