package com.hugdev.ManageLibary.service;

import com.hugdev.ManageLibary.models.Transaction;
import com.hugdev.ManageLibary.repositories.TransRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransService {
    @Autowired
    private TransRepository repo;

    public List<Transaction> getTransUser() {
        return repo.findAll();
    }

    public List<Transaction> getTranUserId(int userId) {
        return  repo.findByUserId(userId);
    }

    public Optional<Transaction> findById(int id) {
        return repo.findById(id);
    }
    public Optional<Transaction> findByBookIdAndUserId(int bookId, int userId) {
        return repo.findByBookIdAndUserId(bookId, userId);
    }
    public Transaction save(Transaction trans) {
        return repo.save(trans);
    }
    public void deleteTrans(int id) {
        repo.deleteById(id);
    }
}
