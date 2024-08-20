package com.wecp.event_management_system.repositories;

import com.wecp.event_management_system.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByAssignedStaffId(Long staffId);
}
