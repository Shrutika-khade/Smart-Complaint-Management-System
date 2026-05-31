package com.project.complaint.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.project.complaint.entity.Activity;
import com.project.complaint.repository.ActivityRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ActivityController {

    private final ActivityRepository activityRepository;

    public ActivityController(
            ActivityRepository activityRepository) {

        this.activityRepository =
                activityRepository;
    }

    @GetMapping("/activities")
    public List<Activity> getActivities() {

        return activityRepository
                .findTop5ByOrderByCreatedAtDesc();
    }
}