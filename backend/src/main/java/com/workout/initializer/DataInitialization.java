package com.workout.initializer;

import com.workout.model.userdetails.User;
import com.workout.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
            user.setPassword(passwordEncoder.encode("12345678"));
            user.setFullName("ADMIN");
            userRepository.save(user);
        }
    }

}
