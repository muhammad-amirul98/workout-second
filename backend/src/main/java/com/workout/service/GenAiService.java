package com.workout.service;

import com.workout.dto.ChatRequestDTO;
import com.workout.model.BookModel;
import com.workout.model.userdetails.User;
import reactor.core.publisher.Flux;

public interface GenAiService {

    String getResponse(ChatRequestDTO request);



}
