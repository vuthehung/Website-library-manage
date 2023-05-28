package com.hugdev.ManageLibary.service;

import com.hugdev.ManageLibary.models.Review;
import com.hugdev.ManageLibary.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository repo;

    public List<Review> getAllRe() {
        return repo.findAll();
    }

    public List<Review> getReBook(int bookId) {
        return  repo.findByBookId(bookId);
    }
    public Optional<Review> getById(int id) {
        return  repo.findById(id);
    }
    public Review saveRe(Review review) {
        return repo.save(review);
    }
}
