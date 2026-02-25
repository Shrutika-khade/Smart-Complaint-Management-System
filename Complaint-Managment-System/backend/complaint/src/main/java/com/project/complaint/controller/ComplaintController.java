package com.project.complaint.controller;

import com.project.complaint.model.Complaint;
import com.project.complaint.service.ComplaintService;
import org.springframework.web.bind.annotation.*;
import com.project.complaint.dto.DashboardResponse;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // POST - create complaint
    @PostMapping
    public Complaint createComplaint(@RequestBody Complaint complaint,
                                 @RequestParam Long userId) {
    return complaintService.createComplaint(complaint, userId);
}
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
                              @RequestParam Long userId) {
    return complaintService.updateComplaintStatus(id, status, userId);
    }

    // DELETE - complaint by id
    @DeleteMapping("/{id}")
    public String deleteComplaint(@PathVariable Long id) {
    complaintService.deleteComplaint(id);
    return "Complaint deleted successfully";
   }

   // DASHBOARD DATA
   @GetMapping("/dashboard")
   public DashboardResponse getDashboard() {
     return complaintService.getDashboardData();
   }



}
