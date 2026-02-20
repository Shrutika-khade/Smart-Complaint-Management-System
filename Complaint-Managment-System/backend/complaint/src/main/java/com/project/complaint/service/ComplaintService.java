package com.project.complaint.service;

import com.project.complaint.model.Complaint;
import com.project.complaint.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import com.project.complaint.model.Department;
import com.project.complaint.repository.DepartmentRepository;


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

    String deptName = complaint.getDepartment().getName();

    Department department = departmentRepository
            .findByName(deptName)
            .orElseGet(() -> {
                Department newDept = new Department();
                newDept.setName(deptName);
                return departmentRepository.save(newDept);
            });

    complaint.setDepartment(department);

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

}
