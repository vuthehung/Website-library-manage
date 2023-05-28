package com.hugdev.ManageLibary.models;

import jakarta.persistence.*;
import org.springframework.stereotype.Repository;

@Entity
@Table(name = "user")
@Repository
public class User {
    @Id
    private int id;
    private String name;
    private String password;
    private String email;
    private boolean is_admin;

    public User() {

    }
    public User(int id, String name, String password, String email, boolean is_admin) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.is_admin = is_admin;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isIs_admin() {
        return is_admin;
    }

    public void setIs_admin(boolean is_admin) {
        this.is_admin = is_admin;
    }
}
