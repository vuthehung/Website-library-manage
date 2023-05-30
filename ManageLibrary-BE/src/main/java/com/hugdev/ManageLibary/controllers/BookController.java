package com.hugdev.ManageLibary.controllers;

import com.hugdev.ManageLibary.models.Book;
import com.hugdev.ManageLibary.models.ResponseObject;
import com.hugdev.ManageLibary.service.BookService;
import com.hugdev.ManageLibary.service.IStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/Books")
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private IStorageService storageService;

    @GetMapping("")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }
    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> getBook(@PathVariable int id) {
        Book b = new Book();
        Optional<Book> book = bookService.getBookById(id);
        return book.isPresent() ?
            ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Truy xuất thành công", book)
            ):
            ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("failed", "Không tìm thấy sách có id = " + id, b)
            );
    }
    @PostMapping("/save/{id}")
    ResponseEntity<ResponseObject> addBook(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("published_date") Date published_date,
            @RequestParam("page") int page,
            @RequestParam("price") int price,
            @RequestParam("des") String des,
            @RequestParam("image_path") MultipartFile image_path,
            @PathVariable int id
    ) throws IOException {

        List<Book> foundBooks = bookService.foundBooks(title.trim(), author.trim());
        if(foundBooks.size() > 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("failed", "Sách này đã có trong CSDL", "")
            );
        }
        String generatedFileName = storageService.storeFile(image_path);
        Book book = new Book();
        book.setTitle(title);
        book.setAuthor(author);
        book.setCategory(category);
        book.setPublised_date(published_date);
        book.setPage(page);
        book.setPrice(price);
        book.setQuantity_sold(0);
        book.setDes(des);
        book.setImage_path(generatedFileName);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Thêm mới sách thành công", bookService.saveBook(book))
        );
    }

    @PutMapping("/save/{id}")
    ResponseEntity<ResponseObject> editBook(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("published_date") Date published_date,
            @RequestParam("page") int page,
            @RequestParam("price") int price,
            @RequestParam("des") String des,
            @RequestParam("image_path") MultipartFile image_path,
            @PathVariable int id
    ) throws IOException {
        String generatedFileName = storageService.storeFile(image_path);
        Optional<Book> editBook = bookService.getBookById(id)
                .map(book -> {
                    book.setTitle(title);
                    book.setAuthor(author);
                    book.setCategory(category);
                    book.setPublised_date(published_date);
                    book.setPage(page);
                    book.setPrice(price);
                    book.setDes(des);
                    book.setImage_path(generatedFileName);
                    return bookService.saveBook(book);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Cập nhật thông tin sách thành công", editBook)
        );
    }
    @PutMapping("/savef/{id}")
    ResponseEntity<ResponseObject> editBookNotImage(
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("category") String category,
            @RequestParam("published_date") Date published_date,
            @RequestParam("page") int page,
            @RequestParam("price") int price,
            @RequestParam("des") String des,
            @PathVariable int id
    ) throws IOException {
        Optional<Book> editBook = bookService.getBookById(id)
                .map(book -> {
                    book.setTitle(title);
                    book.setAuthor(author);
                    book.setCategory(category);
                    book.setPublised_date(published_date);
                    book.setPage(page);
                    book.setPrice(price);
                    book.setDes(des);
                    return bookService.saveBook(book);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Cập nhật thông tin sách thành công", editBook)
        );
    }
    @DeleteMapping("/delete/{id}")
    ResponseEntity<ResponseObject> deleteBook(@PathVariable int id) {
        boolean exist = bookService.existBook(id);
        if(exist) {
            bookService.deleteBook(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("ok", "Xoá thành công sách có id = " + id, "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Không tìm thấy sách có id = " + id, "")
        );
    }

}
