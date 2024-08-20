package com.wecp.event_management_system.services;

import com.wecp.event_management_system.entities.Client;
import com.wecp.event_management_system.entities.EventPlanner;
import com.wecp.event_management_system.entities.Staff;
import com.wecp.event_management_system.entities.User;
import com.wecp.event_management_system.repositories.ClientRepository;
import com.wecp.event_management_system.repositories.EventPlannerRepository;
import com.wecp.event_management_system.repositories.StaffRepository;
import com.wecp.event_management_system.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventPlannerRepository eventPlannerRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        User newUser;
        switch (user.getRole()) {
            case "PLANNER":
                newUser = new EventPlanner();
                copyProperties(user, newUser);
                eventPlannerRepository.save((EventPlanner) newUser);
                break;
            case "CLIENT":
                newUser = new Client();
                copyProperties(user, newUser);
                clientRepository.save((Client) newUser);
                break;
            case "STAFF":
                newUser = new Staff();
                copyProperties(user, newUser);
                staffRepository.save((Staff) newUser);
                break;
            default:
                throw new IllegalArgumentException("Invalid user type");
        }
        return userRepository.save(newUser);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                new ArrayList<>()
        );
    }

    private void copyProperties(User source, User target) {
        target.setUsername(source.getUsername());
        target.setEmail(source.getEmail());
        target.setPassword(passwordEncoder.encode(source.getPassword()));
        target.setRole(source.getRole());
    }



 public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
}