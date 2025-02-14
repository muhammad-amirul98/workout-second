package com.workout.utils;

import java.security.SecureRandom;
import java.util.Random;

public class OTPUtil {

    private static final int OTP_LENGTH = 6;
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public static String generateOTP() {

        int otp = SECURE_RANDOM.nextInt((int) Math.pow(10, OTP_LENGTH)); // Generates a number from 0 to 999999
        return String.format("%0" + OTP_LENGTH + "d", otp); // Ensures leading zeros are preserved
    }
}
