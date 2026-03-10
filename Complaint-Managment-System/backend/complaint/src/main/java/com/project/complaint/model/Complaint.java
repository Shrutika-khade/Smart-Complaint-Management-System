package com.project.complaint.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.project.complaint.entity.User;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String status; // OPEN, IN_PROGRESS, RESOLVED

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

   

   @ManyToOne
   @JoinColumn(name = "user_id")
   private User user;


    public Complaint() {
    this.status = "OPEN";
    this.priority = Priority.LOW;   // default
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
   }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Department getDepartment() {
    return department;
    }

    public void setDepartment(Department department) {
    this.department = department;
    }

    public Priority getPriority() {
    return priority;
    }

    public void setPriority(Priority priority) {
    this.priority = priority;
    }

    public User getUser() {
    return user;
   }

   public void setUser(User user) {
    this.user = user;
   }

   public LocalDateTime getUpdatedAt() {
    return updatedAt;
   }

   public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
   }


}
