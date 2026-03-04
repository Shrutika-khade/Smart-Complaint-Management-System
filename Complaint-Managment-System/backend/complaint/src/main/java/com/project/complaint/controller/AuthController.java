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

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

    // Agar role null ho to default USER
    if (user.getRole() == null || user.getRole().isEmpty()) {
        user.setRole("USER");
    }

    // Encrypt password
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    userRepository.save(user);

    return ResponseEntity.ok("User Registered Successfully");
   }
}