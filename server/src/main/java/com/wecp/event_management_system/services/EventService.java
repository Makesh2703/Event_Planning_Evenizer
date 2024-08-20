package com.wecp.event_management_system.services;

import com.wecp.event_management_system.entities.Event;
import com.wecp.event_management_system.entities.EventPlanner;
import com.wecp.event_management_system.repositories.EventPlannerRepository;
import com.wecp.event_management_system.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventPlannerRepository eventPlannerRepository;

    public Event createEvent(Long plannerId, Event event) {
        EventPlanner planner = eventPlannerRepository.findById(plannerId)
                .orElseThrow(() -> new RuntimeException("Planner not found"));
        event.setPlanner(planner);
        return eventRepository.save(event);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event updateEvent(Long eventId, Event eventDetails) {
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        existingEvent.setTitle(eventDetails.getTitle());
        existingEvent.setDate(eventDetails.getDate());
        existingEvent.setLocation(eventDetails.getLocation());
        existingEvent.setDescription(eventDetails.getDescription());
        existingEvent.setStatus(eventDetails.getStatus());
        existingEvent.setFeedback(eventDetails.getFeedback());
        return eventRepository.save(existingEvent);
    }

    public List<Event> getEventsByPlanner(Long plannerId) {
        return eventRepository.findByPlannerId(plannerId);
    }

    public Event updateFeedback(Long eventId, String feedback) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setFeedback(feedback);
        return eventRepository.save(event);
    }

    public void deleteEvent(Long eventId) {
        eventRepository.deleteById(eventId);
    }
}

