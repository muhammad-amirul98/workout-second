package com.workout.service;

import com.workout.model.ecommerce.Order;
import com.workout.model.ecommerce.Transaction;

import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Order order);
    List<Transaction> getAllTransactions();
}
