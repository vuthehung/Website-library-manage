package com.hugdev.ManageLibary.repositories;

import com.hugdev.ManageLibary.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserId(int userId);
    Optional<Transaction> findByBookIdAndUserId(int bookId, int userId);
}
