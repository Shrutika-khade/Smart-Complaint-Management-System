package com.project.complaint.repository;

import com.project.complaint.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    long countByStatus(String status);

    // 🔹 Get complaints by user
    
    List<Complaint> findByUserId(Long userId);

    List<Complaint> findByDepartmentId(Long departmentId);

    List<Complaint> findByPriority(String priority);

    List<Complaint> findByStatus(String status);

    List<Complaint> findByDepartmentIdAndStatus(Long departmentId, String status);
}