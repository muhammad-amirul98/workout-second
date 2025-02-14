package com.workout.repository;

import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {

    VerificationCode findByEmail(String email);
    VerificationCode findByOtp(String otp);
}
