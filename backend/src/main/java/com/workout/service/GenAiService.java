package com.workout.service;

import com.workout.exception.UserException;
import com.workout.model.BookModel;
import com.workout.model.Message;
import com.workout.model.userdetails.User;

import java.util.List;

public interface GenAiService {

    Message getResponse(String userMessage, User user) throws UserException;
    List<Message> getUserMessages(User user);
}
