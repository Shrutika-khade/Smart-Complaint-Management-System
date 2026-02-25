package com.project.complaint.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.complaint.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}