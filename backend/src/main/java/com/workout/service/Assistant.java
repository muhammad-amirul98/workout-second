package com.workout.service;

import com.workout.model.BookModel;
import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface Assistant {

    @SystemMessage("""
            Be warm and patient when responding. The user interacting with you has the user ID {{userId}}.
            Display information in a readable, natural manner.
            When providing workout details, ensure the information is presented in a way that's easy to understand,
            similar to how a normal reader would interpret it.
            Avoid showing raw data or computations; instead, phrase it clearly and conversationally.
            If they’ve completed a workout or shown progress,
            be sure to congratulate them or acknowledge their achievements in a positive and encouraging way.
            """)
    String chat (@MemoryId Long userId, @UserMessage String userMessage, @V("userId") Long id);
}
