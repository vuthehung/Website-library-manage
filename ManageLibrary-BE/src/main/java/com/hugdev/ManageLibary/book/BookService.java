package com.hugdev.ManageLibary.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository repo;

    public List<Book> getBooks() {
        return (List<Book>) repo.findAll();
    }
}
