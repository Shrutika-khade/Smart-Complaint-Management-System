package com.project.complaint.service;

import com.project.complaint.model.Complaint;
import com.project.complaint.model.Department;
import com.project.complaint.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import com.project.complaint.repository.DepartmentRepository;
import com.project.complaint.dto.DashboardResponse;
import com.project.complaint.model.Priority;
import com.project.complaint.entity.User;
import com.project.complaint.repository.UserRepository;
import com.project.complaint.model.Complaint;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;


    public ComplaintService(ComplaintRepository complaintRepository,
                        DepartmentRepository departmentRepository,
                        UserRepository userRepository) {

    this.complaintRepository = complaintRepository;
    this.departmentRepository = departmentRepository;
    this.userRepository = userRepository;
   }

   public Complaint createComplaintByEmail(Complaint complaint, String email) {

    // 🔹 Find user by email
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // 🔹 Reuse existing method (BEST PRACTICE 🔥)
    return createComplaint(complaint, user.getId());
}


    // CREATE
  public Complaint createComplaint(Complaint complaint, Long userId) {

    System.out.println("Complaint object: " + complaint);
    System.out.println("Department: " + complaint.getDepartment());
    System.out.println("Dept ID: " + (complaint.getDepartment() != null ? complaint.getDepartment().getId() : "NULL"));

    complaint.setStatus("OPEN");
    complaint.setCreatedAt(LocalDateTime.now());
    complaint.setUpdatedAt(LocalDateTime.now());

    // 🔥 ADD THIS BLOCK HERE
    if (complaint.getDepartment() == null || complaint.getDepartment().getId() == null) {
        throw new RuntimeException("Department ID missing ❌");
    }

    Long deptId = complaint.getDepartment().getId();

    // 🔥 DEBUG PRINTS (YAHI ADD KARNA HAI)
    System.out.println("Dept ID: " + deptId);
    System.out.println("Title: " + complaint.getTitle());

    // 🔹 Fetch full department from DB
    Department department = departmentRepository
            .findById(deptId)
            .orElseThrow(() -> new RuntimeException("Department not found"));

    complaint.setDepartment(department);

    // 🔹 Fetch user
    User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

    complaint.setUser(user);

    // 🔹 Default priority logic
    complaint.setPriority(Priority.LOW);

    if (complaint.getTitle() != null) {
        String title = complaint.getTitle().toLowerCase();

        if (title.contains("server") || title.contains("down")) {
            complaint.setPriority(Priority.HIGH);
        } 
        else if (title.contains("network") || title.contains("wifi")) {
            complaint.setPriority(Priority.MEDIUM);
        }
    }
    

    return complaintRepository.save(complaint);
}
    // READ - all
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    // READ - by id
    public Complaint getComplaintById(Long id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
    }

    // UPDATE STATUS
   public Complaint updateComplaintStatusByEmail(Long id, String status, String email) {

    Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // 🔐 ROLE CHECK
    if (!user.getRole().equals("ADMIN")) {
        throw new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.FORBIDDEN,
                "Only ADMIN can update status"
        );
    }

    complaint.setStatus(status);
    complaint.setUpdatedAt(LocalDateTime.now());

    return complaintRepository.save(complaint);
}
    // DELETE
    public void deleteComplaint(Long id) {
    Complaint complaint = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    complaintRepository.delete(complaint);
    }

    public DashboardResponse getDashboardData() {

    long total = complaintRepository.count();
    long open = complaintRepository.countByStatus("OPEN");
    long resolved = complaintRepository.countByStatus("RESOLVED");

    return new DashboardResponse(total, open, resolved);
    }
    // USER wise complaints
    public List<Complaint> getComplaintsByUser(Long userId) {
    return complaintRepository.findByUserId(userId);
    }

    // DEPARTMENT wise complaints
    public List<Complaint> getComplaintsByDepartment(Long deptId) {
    return complaintRepository.findByDepartmentId(deptId);
    }
    public Complaint updateStatus(Long id, String status) {
    Complaint c = complaintRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Complaint not found"));

    c.setStatus(status);

    return complaintRepository.save(c);
}



}
