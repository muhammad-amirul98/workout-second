package com.workout.service;

import com.workout.model.BookModel;
import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface Assistant {

    @SystemMessage("""
            Be warm and patient. The user speaking to you has the userId of {{userId}}.\s
            Greet them with their name.
           \s""")
    String chat (@MemoryId Long userId, @UserMessage String userMessage, @V("userId") Long id);
}
