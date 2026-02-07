package com.project.complaint.service;

import com.project.complaint.model.Complaint;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComplaintService {

    private final List<Complaint> complaints = new ArrayList<>();

    // CREATE
    public Complaint createComplaint(Complaint complaint) {
        complaints.add(complaint);
        return complaint;
    }

    // READ - all
    public List<Complaint> getAllComplaints() {
        return complaints;
    }

    // READ - by id
    public Complaint getComplaintById(Long id) {
        return complaints.stream()
                .filter(c -> c.getId() != null && c.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
