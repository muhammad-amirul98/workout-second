package com.workout.controller;

import com.workout.exception.UserException;
import com.workout.model.Message;
import com.workout.model.userdetails.User;
import com.workout.service.GenAiService;
import com.workout.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GenerativeController {

    private final GenAiService genAiService;
    private final UserService userService;

    @PostMapping("/ai")
    public ResponseEntity<Message> getChatResponse
            (@RequestBody String userMessage,
             @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt
            ) throws UserException {
        if (userMessage != null && userMessage.startsWith("\"") && userMessage.endsWith("\"")) {
            userMessage = userMessage.substring(1, userMessage.length() - 1); // Remove the first and last character
        }
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(genAiService.getResponse(userMessage, user));
    }

    @GetMapping("/ai")
    public ResponseEntity<List<Message>> getUserMessages (
            @RequestHeader(HttpHeaders.AUTHORIZATION) String jwt
    ) throws UserException {
        User user = userService.findUserByJwtToken(jwt);
        return ResponseEntity.ok(genAiService.getUserMessages(user));
    }
}

