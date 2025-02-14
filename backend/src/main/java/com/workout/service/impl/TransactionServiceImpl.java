package com.workout.service.impl;

import com.workout.model.ecommerce.*;
import com.workout.model.userdetails.User;
import com.workout.repository.CartItemRepository;
import com.workout.repository.CartRepository;
import com.workout.repository.TransactionRepository;
import com.workout.service.CartService;
import com.workout.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Order order) {
        Transaction transaction = new Transaction();
        transaction.setOrder(order);

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
