package com.wecp.event_management_system.repositories;

import com.wecp.event_management_system.entities.EventPlanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventPlannerRepository extends JpaRepository<EventPlanner, Long> {
}
