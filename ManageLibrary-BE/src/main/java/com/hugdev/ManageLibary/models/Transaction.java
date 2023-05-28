package com.hugdev.ManageLibary.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Entity
@Table(name = "transaction")
@Repository
public class Transaction {
    @Id
    private int id;
    @ManyToOne(optional = true)
    @JoinColumn(name = "id_book")
    private Book book;
    @ManyToOne(optional = true)
    @JoinColumn(name = "id_user")
    private User user;
    private int quantity;

    public Transaction() {}
    public Transaction(int id, Book book, User user, int quantity) {
        this.id = id;
        this.book = book;
        this.user = user;
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
