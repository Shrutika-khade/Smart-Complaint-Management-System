package com.project.complaint.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.complaint.entity.Activity;

@Repository
public interface ActivityRepository
extends JpaRepository<Activity, Long>{

    List<Activity>
    findTop5ByOrderByCreatedAtDesc();
}