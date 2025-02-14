package com.workout.controller;

import com.workout.exception.ProductException;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.Product;
import com.workout.model.ecommerce.Review;
import com.workout.model.userdetails.User;
import com.workout.request.CreateReviewRequest;
import com.workout.response.ApiResponse;
import com.workout.service.ProductService;
import com.workout.service.ReviewService;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/products/{productId}/review")
    public ResponseEntity<List<Review>> getReviewsByProductId(@PathVariable Long productId) {
        List<Review> reviews = reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/products/{productId}/review")
    public ResponseEntity<Review> writeReview(@PathVariable Long productId,
                                              @RequestBody CreateReviewRequest req,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt
                                              ) throws UserException, ProductException {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);
        Review review = reviewService.createReview(req, user, product);
        return ResponseEntity.ok(review);
    }

    @PutMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Long reviewId,
                                              @RequestBody CreateReviewRequest req,
                                              @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Review review = reviewService.updateReview(reviewId,
                req.getReviewText(),
                req.getReviewRating(),
                user);
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long reviewId,
                                                    @RequestBody CreateReviewRequest req,
                                                    @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        reviewService.deleteReview(reviewId, user);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setMessage("Review #" + reviewId + " successfully deleted");
        return ResponseEntity.ok(apiResponse);
    }
}
