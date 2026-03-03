package com.project.complaint.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @GetMapping("/test")
    public String adminAccess() {
        return "Only ADMIN can access this!";
    }
}