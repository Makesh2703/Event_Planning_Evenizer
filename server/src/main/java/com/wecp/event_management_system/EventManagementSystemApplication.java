package com.wecp.event_management_system;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
// @EnableJpaRepositories(basePackages = "com.wecp.event_management_system.repositories")
// @EntityScan(basePackages = "com.wecp.event_management_system.entities")
public class EventManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(EventManagementSystemApplication.class, args);
	}

}
