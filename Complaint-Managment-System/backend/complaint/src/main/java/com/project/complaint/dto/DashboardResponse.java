package com.project.complaint.dto;

public class DashboardResponse {

    private long totalComplaints;
    private long openComplaints;
    private long resolvedComplaints;

    public DashboardResponse(long totalComplaints,
                             long openComplaints,
                             long resolvedComplaints) {
        this.totalComplaints = totalComplaints;
        this.openComplaints = openComplaints;
        this.resolvedComplaints = resolvedComplaints;
    }

    public long getTotalComplaints() {
        return totalComplaints;
    }

    public long getOpenComplaints() {
        return openComplaints;
    }

    public long getResolvedComplaints() {
        return resolvedComplaints;
    }
}