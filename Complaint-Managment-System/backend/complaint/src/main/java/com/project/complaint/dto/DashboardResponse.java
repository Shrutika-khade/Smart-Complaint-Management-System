package com.project.complaint.dto;

public class DashboardResponse {

    private long totalComplaints;
    private long openComplaints;
    private long resolvedComplaints;
    private long rejectedComplaints;

    public DashboardResponse() {
    }

    public DashboardResponse(long totalComplaints,
                             long openComplaints,
                             long resolvedComplaints,
                             long rejectedComplaints) {

        this.totalComplaints = totalComplaints;
        this.openComplaints = openComplaints;
        this.resolvedComplaints = resolvedComplaints;
        this.rejectedComplaints = rejectedComplaints;
    }

    public long getTotalComplaints() {
        return totalComplaints;
    }

    public void setTotalComplaints(long totalComplaints) {
        this.totalComplaints = totalComplaints;
    }

    public long getOpenComplaints() {
        return openComplaints;
    }

    public void setOpenComplaints(long openComplaints) {
        this.openComplaints = openComplaints;
    }

    public long getResolvedComplaints() {
        return resolvedComplaints;
    }

    public void setResolvedComplaints(long resolvedComplaints) {
        this.resolvedComplaints = resolvedComplaints;
    }

    public long getRejectedComplaints() {
        return rejectedComplaints;
    }

    public void setRejectedComplaints(long rejectedComplaints) {
        this.rejectedComplaints = rejectedComplaints;
    }
}