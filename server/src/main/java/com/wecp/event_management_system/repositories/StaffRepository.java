package com.wecp.event_management_system.repositories;

import com.wecp.event_management_system.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
}
