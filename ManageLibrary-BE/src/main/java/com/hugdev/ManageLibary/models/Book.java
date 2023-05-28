package com.hugdev.ManageLibary.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Repository;

import java.sql.Date;

@Entity
@Table(name = "book")
@Repository
public class Book {
    @Id
    private int id;
    private String title;
    private String author;
    private String category;
    private Date publised_date;
    private int page;

    private int price;
    private int quantity_sold;
    private String des;
    private String image_path;

    public Book() {}


    public Book(int id, String title, String author, String category, Date publised_date, int page, int price, int quantity_sold, String des, String image_path) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = category;
        this.publised_date = publised_date;
        this.page = page;
        this.price = price;
        this.quantity_sold = quantity_sold;
        this.des = des;
        this.image_path = image_path;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getPublised_date() {
        return publised_date;
    }

    public void setPublised_date(Date publised_date) {
        this.publised_date = publised_date;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getQuantity_sold() {
        return quantity_sold;
    }

    public void setQuantity_sold(int quantity_sold) {
        this.quantity_sold = quantity_sold;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }
}
