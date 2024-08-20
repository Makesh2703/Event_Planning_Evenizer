package com.wecp.event_management_system.controllers;


import com.wecp.event_management_system.entities.Event;
import com.wecp.event_management_system.entities.Task;
import com.wecp.event_management_system.services.EventService;
import com.wecp.event_management_system.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner")
public class PlannerController {

    @Autowired
    private EventService eventService;

    @Autowired
    private TaskService taskService;

    @PostMapping("/event")
    public ResponseEntity<Event> createEvent(@RequestParam Long plannerId, @RequestBody Event event) {
        Event createdEvent = eventService.createEvent(plannerId, event);
        return new ResponseEntity<>(createdEvent, HttpStatus.CREATED);
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event updatedEvent = eventService.updateEvent(id, eventDetails);
        return new ResponseEntity<>(updatedEvent, HttpStatus.OK);
    }

    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEventsByPlanner(@RequestParam Long plannerId) {
        List<Event> events = eventService.getEventsByPlanner(plannerId);
        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/tasks/{taskId}/assign/{staffId}")
    public ResponseEntity<Task> assignTaskToStaff(@PathVariable Long taskId, @PathVariable Long staffId) {
        Task assignedTask = taskService.assignTask(taskId, staffId);
        return new ResponseEntity<>(assignedTask, HttpStatus.OK);
    }

    @DeleteMapping("/event/{eventId}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long eventId){
        eventService.deleteEvent(eventId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
