package com.workout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;


@SpringBootApplication
public class WorkoutApplication {

	public static void main(String[] args) {

		setPropertyFromEnv("STRIPE_SECRET_KEY");
		setPropertyFromEnv("RAZOR_SECRET_KEY");
		setPropertyFromEnv("RAZOR_API_KEY");
		setPropertyFromEnv("APP_FRONTEND_SUCCESS_URL");
		setPropertyFromEnv("APP_FRONTEND_CANCEL_URL");
		setPropertyFromEnv("DB_USERNAME");
		setPropertyFromEnv("DB_PASSWORD");
		setPropertyFromEnv("EMAIL_PASSWORD");
		setPropertyFromEnv("OPEN_API_SECRET_KEY");
		setPropertyFromEnv("GEMINI_AI_KEY");
		setPropertyFromEnv("ADMIN_PASSWORD");
		setPropertyFromEnv("FRONTEND_URL");
		setPropertyFromEnv("DB_DRIVER_NAME");
		SpringApplication.run(WorkoutApplication.class, args);
	}

	private static void setPropertyFromEnv(String key) {
		String value = System.getenv(key);
		if (value != null) {
			System.setProperty(key, value);
		} else {
			System.err.println("Warning: Environment variable " + key + " not set");
		}
	}

}
