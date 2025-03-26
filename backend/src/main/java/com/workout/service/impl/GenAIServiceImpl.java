package com.workout.service.impl;

import com.workout.dto.ChatRequestDTO;
import com.workout.model.BookModel;
import com.workout.service.Assistant;
import com.workout.service.GenAiService;
import dev.langchain4j.data.message.ChatMessage;
import dev.langchain4j.data.message.SystemMessage;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.openai.OpenAiChatModel;
import dev.langchain4j.model.openai.OpenAiChatModelName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GenAIServiceImpl implements GenAiService {
    private final Assistant assistant;

    @Override
    public String getResponse(ChatRequestDTO request) {
        return assistant.chat(request.userId(), request.question(), request.userId());
    }

//





}