package com.project.complaint.config;

import com.project.complaint.model.Department;
import com.project.complaint.repository.DepartmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;

    public DataInitializer(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public void run(String... args) {

        String[] departments = {
                "IT Support",
                "Software Development",
                "Network Team",
                "Database Administration",
                "Cyber Security",
                "DevOps",
                "Technical Support",
                "Human Resources",
                "Administration",
                "Finance",
                "Transport",
                "Maintenance",
                "Security"
        };

        for (String deptName : departments) {

            if (departmentRepository.findByName(deptName).isEmpty()) {

                Department department = new Department();
                department.setName(deptName);

                departmentRepository.save(department);
            }
        }
    }
}