package com.project.complaint.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.complaint.entity.User;
import com.project.complaint.repository.UserRepository;
import com.project.complaint.dto.LoginRequest;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // 🔹 Register API
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        // Default role USER
        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok("User Registered Successfully");
    }

    // 🔹 Login API
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid Password");
        }

        return ResponseEntity.ok(user.getRole()); // 👈 Role return kar rahe hain
    }
}