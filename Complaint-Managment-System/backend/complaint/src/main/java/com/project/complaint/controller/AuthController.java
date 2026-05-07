package com.project.complaint.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.complaint.entity.User;
import com.project.complaint.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import com.project.complaint.security.JwtUtil;

import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                      PasswordEncoder passwordEncoder,
                      JwtUtil jwtUtil) {

    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
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
   

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody User user,
                               HttpServletRequest request) {

    Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());

    if (optionalUser.isEmpty()) {
        return ResponseEntity.status(401).body("Invalid email");
    }

    User existingUser = optionalUser.get();

    if (!passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
        return ResponseEntity.status(401).body("Invalid password");
    }

    // 🔥 JWT TOKEN GENERATE
    String token = jwtUtil.generateToken(existingUser.getEmail());

    Map<String, String> response = new HashMap<>();

    response.put("message", "Login Successful");
    response.put("role", existingUser.getRole());
    response.put("name", existingUser.getName());
    response.put("token", token);

    return ResponseEntity.ok(response);
}
}