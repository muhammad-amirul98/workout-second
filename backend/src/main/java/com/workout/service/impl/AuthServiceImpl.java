package com.workout.service.impl;

import com.workout.config.JwtProvider;
import com.workout.constant.EmailTemplate;
import com.workout.enums.UserRole;
import com.workout.exception.InvalidOtpException;
import com.workout.exception.UserException;
import com.workout.model.ecommerce.Cart;
import com.workout.model.ecommerce.VerificationCode;
import com.workout.model.ecommerce.WishList;
import com.workout.model.userdetails.User;
import com.workout.model.workouts.WorkoutWatchList;
import com.workout.repository.*;
import com.workout.request.SignInRequest;
import com.workout.request.SignUpRequest;
import com.workout.response.AuthResponse;
import com.workout.service.AuthService;
import com.workout.service.EmailService;
import com.workout.utils.OTPUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final WishListRepository wishListRepository;
    private final WorkoutWatchListRepository workoutWatchListRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;

    @Override
    public void sendOTP(String email) throws UserException, MessagingException {
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);
        if (verificationCode != null) {
            verificationCodeRepository.delete(verificationCode);
        }

        String otp = OTPUtil.generateOTP();
        VerificationCode newVerificationCode = new VerificationCode();
        newVerificationCode.setOtp(otp);
        newVerificationCode.setEmail(email);
        verificationCodeRepository.save(newVerificationCode);

        String text = String.format(EmailTemplate.OTP_EMAIL_TEMPLATE, otp);

        emailService.sendVerificationOtpEmail(email, EmailTemplate.OTP_SUBJECT, text);
    }

    @Override
    public AuthResponse signIn(SignInRequest signInRequest) {
        String email = signInRequest.getEmail();
        String otp = signInRequest.getOtp();

        Authentication authentication = authenticate(email, otp);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        Collection<? extends GrantedAuthority> grantedAuthorities = authentication.getAuthorities();
        String role = grantedAuthorities.isEmpty()?null: grantedAuthorities.iterator().next().getAuthority();

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Successfully Logged In");
        authResponse.setRole(UserRole.valueOf(role));
        return authResponse;
    }

    private Authentication authenticate(String email, String otp) {
        //Verify user details
        UserDetails userDetails = customUserService.loadUserByUsername(email);
        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }

        //Verify code
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(email);
        if (verificationCode == null || !verificationCode.getOtp().equals(otp)) {
            throw new BadCredentialsException("Invalid OTP");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
    }

    @Override
    public String signUp(SignUpRequest signUpRequest) {

        VerificationCode verificationCode = verificationCodeRepository.findByEmail(signUpRequest.getEmail());

        if (verificationCode == null || !verificationCode.getOtp().equals(signUpRequest.getOtp())) {
            throw new InvalidOtpException("Wrong OTP Provided.");
        }

        User user = userRepository.findByEmail(signUpRequest.getEmail()).orElseGet(() -> createNewUser(signUpRequest));
        authenticateUser(user);

        return jwtProvider.generateToken(SecurityContextHolder.getContext().getAuthentication());
    }

    @Override
    public String adminSignUp(SignUpRequest signUpRequest) throws Exception {
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(signUpRequest.getEmail());

        if (verificationCode == null || !verificationCode.getOtp().equals(signUpRequest.getOtp())) {
            throw new InvalidOtpException("Wrong OTP Provided.");
        }

        User user = userRepository.findByEmail(signUpRequest.getEmail()).orElseGet(() -> createNewAdmin(signUpRequest));
        authenticateUser(user);

        return jwtProvider.generateToken(SecurityContextHolder.getContext().getAuthentication());
    }

    private User createNewAdmin(SignUpRequest signUpRequest) {
        User newUser = new User();
        newUser.setFullName(signUpRequest.getFullName());
        newUser.setEmail(signUpRequest.getEmail());
        newUser.setMobile("90123121");
        newUser.setPassword(passwordEncoder.encode(signUpRequest.getOtp()));
        newUser.setRole(UserRole.ROLE_ADMIN);

        newUser = userRepository.save(newUser);


        return newUser;
    }

    private User createNewUser(SignUpRequest signUpRequest) {
        User newUser = new User();
        newUser.setFullName(signUpRequest.getFullName());
        newUser.setEmail(signUpRequest.getEmail());
        newUser.setMobile("90123121");
        newUser.setPassword(passwordEncoder.encode(signUpRequest.getOtp()));

        newUser = userRepository.save(newUser);

        initializeUserEntities(newUser);

        return newUser;
    }

    private void initializeUserEntities(User user) {
        if (user.getCart() == null) {
            Cart cart = new Cart(user);
            cart = cartRepository.save(cart);
            user.setCart(cart); // Ensure user entity holds reference to the cart
        }

        if (user.getWishList() == null) {
            WishList wishList = new WishList(user);
            wishList = wishListRepository.save(wishList);
            user.setWishList(wishList);
        }

        if (user.getWorkoutWatchList() == null) {
            WorkoutWatchList watchList = new WorkoutWatchList(user);
            watchList = workoutWatchListRepository.save(watchList);
            user.setWorkoutWatchList(watchList);
        }

        userRepository.save(user);
    }


    private void authenticateUser(User user) {
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getRole().toString()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
