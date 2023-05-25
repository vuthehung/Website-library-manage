package com.hugdev.ManageLibary.controllers;

import com.hugdev.ManageLibary.models.ResponseObject;
import com.hugdev.ManageLibary.models.User;
import com.hugdev.ManageLibary.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("api/User")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping("/login")
    ResponseEntity<ResponseObject> login(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            HttpSession session
    ) {
        Optional<User> user = service.findByEmail(email);
        if(user.isPresent()) {
            if(user.get().isIs_admin()) {
                if(email.equals(user.get().getEmail()) && password.equals(user.get().getPassword())) {
                    session.setAttribute("email", email);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("ok", "Đăng nhập thành công với role là admin", user)
                    );
                }else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                            new ResponseObject("failed", "Sai email hoặc mật khẩu", "")
                    );
                }
            }else {
                if(email.equals(user.get().getEmail()) && password.equals(user.get().getPassword())) {
                    session.setAttribute("email", email);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            new ResponseObject("ok", "Đăng nhập thành công với role là user", user)
                    );
                }else {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                            new ResponseObject("failed", "Sai email hoặc mật khẩu", "")
                    );
                }
            }
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new ResponseObject("failed", "Sai email hoặc mật khẩu", "")
            );
        }
    }
    @PostMapping("/register")
    ResponseEntity<ResponseObject> registerUser(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("password") String password
    ) {
        if(service.existUser(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(
                    new ResponseObject("failed", "Email đã được đăng ký", "")
            );
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        service.saveUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("ok", "Đăng ký thành công", "")
        );
    }
}
