package com.wecp.event_management_system.controllers;

import com.wecp.event_management_system.entities.Staff;
import com.wecp.event_management_system.entities.Task;
import com.wecp.event_management_system.services.TaskService;
import com.wecp.event_management_system.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;
    @GetMapping("/tasks/{staffId}")
    public ResponseEntity<List<Task>> getTasks(@PathVariable Long staffId) {
        List<Task> tasks = taskService.getAssignedTasks(staffId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Staff>> getStaff() {
        List<Staff> staffs = userService.getAllStaff();
        return new ResponseEntity<>(staffs, HttpStatus.OK);
    }

    @PutMapping("/tasks/{taskId}")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long taskId, @RequestParam String status) {
        Task task = taskService.updateTaskStatus(taskId, status);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
   
}
