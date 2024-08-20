Event Management System
Overview
A comprehensive system designed to streamline the management of events, assigning tasks and client interactio. The platform supports multiple user roles with distinct functionalities to ensure smooth event planning and execution.

Users of the System
Event Planners: Organize events, create tasks and assign tasks to staff
Clients: View event progress, provide feedback, and communicate with planners
Staff Members: Oversee specific tasks related to event preparation and execution.

Functional Requirements
1: User Registration & Profile Management 
   Users can register, log in, and manage their profiles with secure data handling.

2: Event Scheduling & Management
   Event planners can create, update, and manage event details.
   Assign tasks to staff members and track task progress.

3: Staff members can view assigned tasks, update task status, and communicate with planners.

4: Clients can view event progress, provide feedback, and communicate with planners.

Role-Based Authentication & Authorization

The system assigns roles to users, providing tailored interfaces and functionalities.
Implement JWT for secure session management and API protection.\
JWT role of Event planner is PLANNER, Client is CLIENT and Staff is STAFF.

Technology Stack
Backend: Spring Boot, JPA, MySQL
Frontend: Angular
Security: Spring Security, JWT

Key Points to Note
Security: Ensure data protection and secure API access.
Scalability: Capable of scaling for large events and an increasing user base.
User Interface Consistency: Consistent UI/UX across various modules.
Best Practices: Adhere to coding best practices and ensure maintainability.

Backend Functionalities to be Built
Build the relationships between entities and implement the required API endpoints.
Implement the missing code in services and repositories.
Role-Based Authentication
Define access levels for planners, clients, and staff in Security Config.
JWT Token Management
Handle token generation, validation, and expiration.

API Endpoints
For Registration & Login
1: POST /api/user/register -> register a new user
   payload: {
"username": "username_62a6a0ed7a56",
"email": "email_93d5a68b990f",
"password": "password_bbf454abc35d",
"role": "PLANNER",
}
Note that role could be PLANNER, CLIENT or STAFF

2: POST /api/user/login -> login and generate JWT token
payload: {
"username": "username_634237c60335",
"password": "password_d6fe6a347bfb"
}

For Planner
1: POST /api/planner/event?plannerId=plannerId -> create a new event
    payload: {
"title": "title_1a7c7b41f45f",
"date": "2024-06-28 14:54:32",
"location": "location_60e67edf430d",
"description": "description_dfdd104d37d9",
"status": "status_d43812dcd789"
}
2: PUT /api/planner/event/{id} -> update event details
    payload: {
"title": "title_4d3d1d95217b",
"date": "2024-06-28 14:55:18",
"location": "location_11c07e0d9339",
"description": "description_c3f9afd96cb1",
"status": "status_c765401d71bd",
}

3: GET /api/planner/events?plannerId=plannerId -> get events created by the planner

4: POST /api/planner/task -> create a new task
   payload: {
"description": "description_d5dab7030b61",
"status": "status_f6e00648f435",
}
5: GET /api/planner/tasks -> get all tasks 
6: POST /api/planner/tasks/{taskId}/assign/{staffId} -> assign a task to a staff member

For Staff
1: GET /api/staff/tasks/{staffId} -> get tasks assigned to the staff
2: PUT /api/staff/tasks/{taskId}?status=updatedStatus -> update task status

For Client
1: GET /api/client/events -> get all events
2: PUT /api/client/event/{eventId}?feedback=feedbackOfEvent -> provide feedback of an event
