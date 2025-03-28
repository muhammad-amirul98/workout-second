package com.workout.repository;

import com.workout.model.Message;
import com.workout.model.userdetails.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByUser(User user);
}
