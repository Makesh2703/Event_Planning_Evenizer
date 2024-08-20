package com.wecp.event_management_system.repositories;

import com.wecp.event_management_system.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
