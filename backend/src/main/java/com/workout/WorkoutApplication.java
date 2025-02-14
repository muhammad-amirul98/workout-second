package com.workout;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class WorkoutApplication {

	public static void main(String[] args) {

		Dotenv dotenv = Dotenv.load();
		System.setProperty("STRIPE_SECRET_KEY", dotenv.get("STRIPE_SECRET_KEY"));
		System.setProperty("RAZOR_SECRET_KEY", dotenv.get("RAZOR_SECRET_KEY"));
		System.setProperty("RAZOR_API_KEY", dotenv.get("RAZOR_API_KEY"));
		System.setProperty("APP_FRONTEND_SUCCESS_URL", dotenv.get("APP_FRONTEND_SUCCESS_URL"));
		System.setProperty("APP_FRONTEND_CANCEL_URL", dotenv.get("APP_FRONTEND_CANCEL_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("EMAIL_PASSWORD", dotenv.get("EMAIL_PASSWORD"));

		SpringApplication.run(WorkoutApplication.class, args);
	}

}
