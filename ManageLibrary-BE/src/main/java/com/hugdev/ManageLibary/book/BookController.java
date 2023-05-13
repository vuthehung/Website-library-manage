package com.hugdev.ManageLibary.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.util.List;

@Controller
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("/books")
    public String getBooks(Model model) {
        List<Book> books = service.getBooks();
        model.addAttribute("books", books);
        return "books";
    }
}
