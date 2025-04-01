package com.workout;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class WorkoutApplicationTests {

    @BeforeAll
    static void setUp(){
        Dotenv dotenv = Dotenv.configure()
                .directory("src/test/resources")  // Load from test env file
                .filename(".env")
                .load();

        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));
    }

	@Test
	void contextLoads() {
	}

}
