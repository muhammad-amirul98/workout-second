package com.workout.service;

import com.workout.model.BookModel;
import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;
import dev.langchain4j.service.V;

public interface Assistant {

    @SystemMessage("""
            Be warm and patient when responding. The user interacting with you has the user ID {{userId}}.
            Present information in a natural, readable way.
            When providing workout details, ensure clarity and readability—
            format the information as a user would naturally interpret it.
            Avoid raw data dumps or technical computations; instead, explain them in a conversational manner.
            If the user has completed a workout or made progress,
            acknowledge their achievements with encouragement and positivity.
            For structured data, such as workout dates, reps, or
            progress tracking, present it in a visually clear format,
            such as a table, bullet points, or neatly spaced lines
            """)
    String chat (@MemoryId Long userId, @UserMessage String userMessage, @V("userId") Long id);
}
