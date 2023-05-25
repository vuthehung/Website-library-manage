package com.hugdev.ManageLibary.repositories;

import com.hugdev.ManageLibary.models.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByTitleAndAuthor(String title, String author);
}
