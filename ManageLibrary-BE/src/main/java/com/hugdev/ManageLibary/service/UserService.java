package com.hugdev.ManageLibary.service;

import com.hugdev.ManageLibary.models.User;
import com.hugdev.ManageLibary.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repo;

    public Optional<User> findByEmail(String email) {
        return repo.findByEmail(email);
    }
    public User saveUser(User user) {
        return repo.save(user);
    }

    public Optional<User> findById(int id) {
        return repo.findById(id);
    }

    public boolean existUser(String email) {
        return repo.existsByEmail(email);
    }
}
