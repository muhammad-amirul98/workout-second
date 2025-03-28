package com.workout.service.impl;

import com.workout.enums.MessageOwner;
import com.workout.exception.UserException;
import com.workout.model.Message;
import com.workout.model.userdetails.User;
import com.workout.repository.MessageRepository;
import com.workout.repository.UserRepository;
import com.workout.service.Assistant;
import com.workout.service.GenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenAIServiceImpl implements GenAiService {
    private final Assistant assistant;
    private final MessageRepository messageRepository;

    @Override
    public Message getResponse(String message, User user) throws UserException {
        // Log history for user message
        Long userId = user.getId();
        Message userMessage = new Message();
        userMessage.setMessageOwner(MessageOwner.USER);
        userMessage.setMessage(message);

        userMessage.setUser(user);
        messageRepository.save(userMessage);

        //Log history for bot message
        Message botMessage = new Message();
        botMessage.setUser(user);
        botMessage.setMessageOwner(MessageOwner.BOT);
        try {
            botMessage.setMessage(assistant.chat(userId, message, userId));
        } catch (Exception e){
            System.out.println(e.getMessage());
            botMessage.setMessage("I'm sorry, I couldn't process that request. Please try again.");
        }
        return messageRepository.save(botMessage);
    }

    @Override
    public List<Message> getUserMessages(User user) {
        return messageRepository.findByUser(user);
    }
}