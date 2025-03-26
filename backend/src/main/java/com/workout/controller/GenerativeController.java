package com.workout.controller;

import com.workout.dto.ChatRequestDTO;
import com.workout.dto.ChatResponseDTO;
import com.workout.model.BookModel;
import com.workout.service.GenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequiredArgsConstructor
public class GenerativeController {

    private final GenAiService genAiService;

    @PostMapping("/ai")
    public ResponseEntity<ChatResponseDTO> getChatResponse(@RequestBody ChatRequestDTO req) {
        return ResponseEntity.ok(new ChatResponseDTO(genAiService.getResponse(req)));
    }

}

