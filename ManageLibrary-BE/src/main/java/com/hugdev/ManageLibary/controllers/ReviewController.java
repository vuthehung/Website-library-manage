package com.hugdev.ManageLibary.controllers;

import com.hugdev.ManageLibary.models.Book;
import com.hugdev.ManageLibary.models.Review;
import com.hugdev.ManageLibary.models.User;
import com.hugdev.ManageLibary.service.BookService;
import com.hugdev.ManageLibary.service.ReviewService;
import com.hugdev.ManageLibary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private BookService bookSe;
    @Autowired
    private UserService userSe;
    @Autowired
    private ReviewService reviewSe;

    @GetMapping("/all")
    public List<Review> getAll() {
        return reviewSe.getAllRe();
    }
    @GetMapping("/book/{id}")
    public List<Review> getReBook(@PathVariable int id) {
        return reviewSe.getReBook(id);
    }
    @PostMapping("/add")
    public Review addReview(
            @RequestParam("bookId") int bookId,
            @RequestParam("userId") int userId,
            @RequestParam("rating") int rating,
            @RequestParam("comment") String comment
    ) {
        Optional<Book> book = bookSe.getBookById(bookId);
        Optional<User> user = userSe.findById(userId);

        Review review = new Review();
        review.setBook(book.get());
        review.setUser(user.get());
        review.setRating(rating);
        review.setComment(comment);

        return reviewSe.saveRe(review);
    }
}
