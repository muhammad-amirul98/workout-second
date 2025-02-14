package com.workout.service;

import com.workout.model.ecommerce.Product;
import com.workout.model.ecommerce.Review;
import com.workout.model.userdetails.User;
import com.workout.request.CreateReviewRequest;

import java.util.List;

public interface ReviewService {
    Review createReview(CreateReviewRequest req,
                        User user,
                        Product product);
    List<Review> getReviewByProductId(Long productId);

    Review updateReview(Long reviewId, String reviewText, double reviewRating, User user) throws Exception;

    void deleteReview(Long reviewId, User user) throws Exception;


}
