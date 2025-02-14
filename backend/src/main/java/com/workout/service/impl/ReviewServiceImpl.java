package com.workout.service.impl;

import com.workout.model.ecommerce.Product;
import com.workout.model.ecommerce.Review;
import com.workout.model.userdetails.User;
import com.workout.repository.ReviewRepository;
import com.workout.request.CreateReviewRequest;
import com.workout.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(CreateReviewRequest req, User user, Product product) {
        Review review = new Review();
        review.setProduct(product);
        review.setUser(user);
        review.setReviewImages(req.getProductImages());
        review.setReviewText(req.getReviewText());
        review.setRating(req.getReviewRating());
        product.getReviews().add(review);
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Override
    public Review updateReview(Long reviewId, String reviewText, double reviewRating, User user) throws Exception {
        Review review = reviewRepository.findById(reviewId).
                orElseThrow(() -> new Exception("Review Not Found"));
        if (!review.getUser().equals(user)) {
            throw new Exception("Unauthorized: You can only update your own review.");
        }
        review.setReviewText(reviewText);
        review.setRating(reviewRating);
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, User user) throws Exception {
        Review review = reviewRepository.findById(reviewId).
                orElseThrow(() -> new Exception("Review Not Found"));
        if (!review.getUser().equals(user)) {
            throw new Exception("Unauthorized: You can only delete your own review.");
        }
        reviewRepository.delete(review);
    }
}
