package com.project.complaint.controller;

import com.project.complaint.model.Complaint;
import com.project.complaint.service.ComplaintService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.complaint.dto.DashboardResponse;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // POST - create complaint
  
    // GET - all complaints
    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    // GET - complaints by user
   @GetMapping("/user/{userId}")
    public List<Complaint> getUserComplaints(@PathVariable Long userId) {
    return complaintService.getComplaintsByUser(userId);
    }

    // GET - complaint by id
    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {
        return complaintService.getComplaintById(id);
    }

     // UPDATE - complaint status
    @PutMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Long id,
                              @RequestParam String status,
                              Principal principal) {

    String email = principal.getName();

    return complaintService.updateComplaintStatusByEmail(id, status, email);
   }

    // DELETE - complaint by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComplaint(@PathVariable Long id) {
    complaintService.deleteComplaint(id);
    return ResponseEntity.ok("Complaint deleted successfully");
   }

   // DASHBOARD DATA
   @GetMapping("/dashboard")
   public DashboardResponse getDashboard() {
     return complaintService.getDashboardData();
   }

    // DEPARTMENT complaints
   @GetMapping("/department/{deptId}")
   public List<Complaint> getDepartmentComplaints(@PathVariable Long deptId) {
    return complaintService.getComplaintsByDepartment(deptId);
   }
   @PostMapping
public Complaint createComplaint(@RequestBody Complaint complaint,
                                 Principal principal) {

    if (principal == null) {
        throw new RuntimeException("User not logged in ❌");
    }

    String email = principal.getName();
    System.out.println("Logged user: " + email);

    return complaintService.createComplaintByEmail(complaint, email);
}



}
