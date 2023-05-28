package com.hugdev.ManageLibary.models;

import jakarta.persistence.*;

@Entity
@Table(name = "review")
public class Review {
    @Id
    private int id;
    private int rating;
    private String comment;
    @ManyToOne(optional = true)
    @JoinColumn(name = "book_id")
    private Book book;
    @ManyToOne(optional = true)
    @JoinColumn(name = "user_id")
    private User user;

    public Review() {}
    public Review(int id, int rating, String comment, Book book, User user) {
        this.id = id;
        this.rating = rating;
        this.comment = comment;
        this.book = book;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
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
}
