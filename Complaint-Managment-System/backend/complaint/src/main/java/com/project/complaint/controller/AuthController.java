package com.project.complaint.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.complaint.entity.User;
import com.project.complaint.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // 🔹 Register API
    @PostMapping("/register")
   public ResponseEntity<?> register(@RequestBody User user) {

    // 🔍 DEBUG LINE
    System.out.println("Incoming password: " + user.getPassword());

    user.setRole("USER");

    // 🔐 ENCODE PASSWORD
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    userRepository.save(user);

    return ResponseEntity.ok("User Registered Successfully");
   }
}