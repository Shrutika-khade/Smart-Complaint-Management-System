package com.project.complaint.service;

import com.project.complaint.model.Complaint;
import com.project.complaint.model.Department;
import com.project.complaint.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import com.project.complaint.repository.DepartmentRepository;
import com.project.complaint.dto.DashboardResponse;
import com.project.complaint.model.Priority;


import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final DepartmentRepository departmentRepository;


    public ComplaintService(ComplaintRepository complaintRepository,
                        DepartmentRepository departmentRepository) {
    this.complaintRepository = complaintRepository;
    this.departmentRepository = departmentRepository; 
  }


    // CREATE
   public Complaint createComplaint(Complaint complaint) {

    // 🔹 Fetch full department from DB
    Long deptId = complaint.getDepartment().getId();

    Department department = departmentRepository
            .findById(deptId)
            .orElseThrow(() -> new RuntimeException("Department not found"));

    complaint.setDepartment(department);

    // 🔹 Default priority
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
    public Complaint updateComplaintStatus(Long id, String status) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status);
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

}
