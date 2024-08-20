package com.wecp.event_management_system.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDateTime date;

    private String location;

    private String description;

    private String status;

    private String feedback;

    @ManyToOne
    @JoinColumn(name = "planner_id", nullable = false)
    private EventPlanner planner;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public EventPlanner getPlanner() {
        return planner;
    }

    public void setPlanner(EventPlanner planner) {
        this.planner = planner;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}

