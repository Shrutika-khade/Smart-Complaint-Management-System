package com.project.complaint.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.complaint.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

   Optional<User> findByEmail(String email);

}