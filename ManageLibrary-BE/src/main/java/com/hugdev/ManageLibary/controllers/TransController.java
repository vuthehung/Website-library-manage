package com.hugdev.ManageLibary.controllers;

import com.hugdev.ManageLibary.models.Book;
import com.hugdev.ManageLibary.models.Transaction;
import com.hugdev.ManageLibary.models.User;
import com.hugdev.ManageLibary.service.BookService;
import com.hugdev.ManageLibary.service.TransService;
import com.hugdev.ManageLibary.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/transaction")
public class TransController {

    @Autowired
    private TransService transSe;
    @Autowired
    private UserService userSe;
    @Autowired
    private BookService bookSe;
    @GetMapping("/user")
    public List<Transaction> getTransUser() {
        return transSe.getTransUser();
    }

    @GetMapping("/user/{id}")
    public List<Transaction> getTranUserId(@PathVariable int id) {
        return transSe.getTranUserId(id);
    }

    @GetMapping("/book/{bookID}/user/{userId}")
    public Optional<Transaction> findByBookId(@PathVariable("bookId") int bookId, @PathVariable("userId") int userId) {
        return transSe.findByBookIdAndUserId(bookId, userId);
    }
    @PostMapping("/add")
    public Transaction addTrans(
            @RequestParam("userId") int userId,
            @RequestParam("bookId") int bookId,
            @RequestParam("quantity") int quantity
    ) {
        Optional<User> user = userSe.findById(userId);
        Optional<Book> book = bookSe.getBookById(bookId);
        Transaction transaction = new Transaction();
        transaction.setBook(book.get());
        transaction.setUser(user.get());
        transaction.setQuantity(quantity);
        return transSe.save(transaction);
    }

    @PutMapping("/update/{id}")
    public Transaction updateTran(
            @RequestParam("quantity") int quantity,
            @PathVariable int id
    ) {
        Optional<Transaction> trans = transSe.findById(id);
        Transaction transaction = trans.get();
        transaction.setQuantity(quantity);
        return transSe.save(transaction);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTrans(@PathVariable int id) {
        transSe.deleteTrans(id);
    }
}
