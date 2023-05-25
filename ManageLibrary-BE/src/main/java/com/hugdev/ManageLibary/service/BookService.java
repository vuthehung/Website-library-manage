package com.hugdev.ManageLibary.service;

import com.hugdev.ManageLibary.models.Book;
import com.hugdev.ManageLibary.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository repo;

    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    public Optional<Book> getBookById(int id) {
        return repo.findById(id);
    }

    public List<Book> foundBooks(String title, String author) {
        return repo.findByTitleAndAuthor(title, author);
    }

    public Book saveBook(Book book) {
        return repo.save(book);
    }
    public void deleteBook(int id) {
        repo.deleteById(id);
    }
    public boolean existBook(int id) {
        return repo.existsById(id);
    }
}
