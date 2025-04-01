package com.workout.initializer;

import com.workout.enums.UserRole;
import com.workout.model.userdetails.User;
import com.workout.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ExerciseDataLoader exerciseDataLoader;

    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @Override
    public void run(String... args) {
        initializeAdminUser();
        exerciseDataLoader.loadExercises();
    }

    private void initializeAdminUser() {
        String adminEmail = "moamirul1998@gmail.com";
        Optional<User> optionalUser = userRepository.findByEmail(adminEmail);
        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setEmail(adminEmail);
            user.setRole(UserRole.ROLE_ADMIN);
            user.setPassword(passwordEncoder.encode(adminPassword));
            user.setFullName("ADMIN");
            userRepository.save(user);
        }
    }

}
