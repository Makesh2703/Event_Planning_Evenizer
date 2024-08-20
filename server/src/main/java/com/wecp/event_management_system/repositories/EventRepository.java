package com.wecp.event_management_system.repositories;

import com.wecp.event_management_system.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByPlannerId(Long plannerId);
}
