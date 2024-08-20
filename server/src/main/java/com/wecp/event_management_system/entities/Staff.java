package com.wecp.event_management_system.entities;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "staffs")
public class Staff extends User {
    // Additional fields specific to Staff if any
}
