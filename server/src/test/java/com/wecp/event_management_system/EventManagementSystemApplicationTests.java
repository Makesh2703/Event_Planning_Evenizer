package com.wecp.event_management_system;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wecp.event_management_system.dto.LoginRequest;
import com.wecp.event_management_system.entities.*;
import com.wecp.event_management_system.repositories.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import javax.transaction.Transactional;

import java.time.LocalDateTime;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class EventManagementSystemApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private EventPlannerRepository eventPlannerRepository;

	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private ClientRepository clientRepository;

	@Autowired
	private EventRepository eventRepository;

	@Autowired
	private TaskRepository taskRepository;

	@BeforeEach
	public void setUp() {
		// Clear the database before each test
		eventPlannerRepository.deleteAll();
		staffRepository.deleteAll();
		clientRepository.deleteAll();
		userRepository.deleteAll();
		eventRepository.deleteAll();
		taskRepository.deleteAll();
	}

	@Test
	public void testRegisterUser() throws Exception {
		// Create a User object for registration
		User user = new User();
		user.setUsername("testUser");
		user.setPassword("testPassword");
		user.setEmail("test@example.com");
		user.setRole("PLANNER");

		// Perform a POST request to the /register endpoint using MockMvc
		mockMvc.perform(post("/api/user/register")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsBytes(user)))
				.andExpect(MockMvcResultMatchers.status().isCreated())
				.andExpect(jsonPath("$.username").value(user.getUsername()))
				.andExpect(jsonPath("$.email").value(user.getEmail()))
				.andExpect(jsonPath("$.role").value(user.getRole()));

		// Assert business is created in the database
		User savedUser = userRepository.findAll().get(0);
		assertEquals(user.getUsername(), savedUser.getUsername());
		assertEquals(user.getEmail(), savedUser.getEmail());
		assertEquals(user.getRole(), savedUser.getRole());
	}

	@Test
	public void testLoginUser() throws Exception {
		// Create a user for registration
		User user = new User();
		user.setUsername("testUser");
		user.setPassword("password");
		user.setRole("PLANNER");
		user.setEmail("testUser@gmail.com");
		// Register the user
		mockMvc.perform(post("/api/user/register")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(user)))
				.andExpect(status().isCreated());

		// Login with the registered user
		LoginRequest loginRequest = new LoginRequest("testUser", "password");

		mockMvc.perform(post("/api/user/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(loginRequest)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").exists());
	}

	@Test
	public void testLoginWithWrongUsernameOrPassword() throws Exception {
		// Create a login request with a wrong username
		LoginRequest loginRequest = new LoginRequest("wronguser", "password");

		mockMvc.perform(post("/api/user/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(loginRequest)))
				.andExpect(status().isUnauthorized()); // Expect a 401 Unauthorized response
	}

	// event planner controller test
	@Test
	@WithMockUser(username = "testPlanner", roles = {"PLANNER"})
	public void testCreateEvent() throws Exception {
		EventPlanner planner = createEventPlanner();
		// Create an event
		Event event = new Event();
		event.setTitle("Test Event");
		event.setDescription("Test Event Description");
		event.setDate(LocalDateTime.now().plusDays(10));

		// Perform a POST request to create the event
		mockMvc.perform(post("/api/planner/event")
						.param("plannerId", planner.getId().toString())
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(event)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.title").value(event.getTitle()))
				.andExpect(jsonPath("$.description").value(event.getDescription()))
				.andExpect(jsonPath("$.date").exists());

		// Assert the event is created in the database
		Event savedEvent = eventRepository.findAll().get(0);
		assertEquals(event.getTitle(), savedEvent.getTitle());
		assertEquals(event.getDescription(), savedEvent.getDescription());
		assertEquals(event.getDate(), savedEvent.getDate());
		assertEquals(planner.getId(), savedEvent.getPlanner().getId());
	}

	@Test
	@WithMockUser(username = "testPlanner", roles = {"PLANNER"})
	public void testUpdateEvent() throws Exception {
		EventPlanner savedPlanner = createEventPlanner();

		// Create an event
		Event event = new Event();
		event.setTitle("Test Event");
		event.setDescription("Test Event Description");
		event.setDate(LocalDateTime.now().plusDays(10));
		event.setPlanner(savedPlanner);

		// Save the event in the database
		Event savedEvent = eventRepository.save(event);

		// Create updated event details
		Event updatedEventDetails = new Event();
		updatedEventDetails.setTitle("Updated Test Event");
		updatedEventDetails.setDescription("Updated Test Event Description");
		updatedEventDetails.setDate(LocalDateTime.now().plusDays(20));

		// Perform a PUT request to update the event
		mockMvc.perform(put("/api/planner/event/" + savedEvent.getId())
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(updatedEventDetails)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.title").value(updatedEventDetails.getTitle()))
				.andExpect(jsonPath("$.description").value(updatedEventDetails.getDescription()))
				.andExpect(jsonPath("$.date").exists());

		// Assert the event is updated in the database
		Event updatedEvent = eventRepository.findById(savedEvent.getId()).orElse(null);
		assertNotNull(updatedEvent);
		assertEquals(updatedEventDetails.getTitle(), updatedEvent.getTitle());
		assertEquals(updatedEventDetails.getDescription(), updatedEvent.getDescription());
		assertEquals(updatedEventDetails.getDate(), updatedEvent.getDate());
	}

	@Test
	@WithMockUser(username = "testPlanner", roles = {"PLANNER"})
	public void testGetEventsByPlanner() throws Exception {
		EventPlanner savedPlanner = createEventPlanner();

		// Create and save a couple of events for the planner
		Event event1 = new Event();
		event1.setTitle("Test Event 1");
		event1.setDescription("Test Event Description 1");
		event1.setDate(LocalDateTime.now().plusDays(10));
		event1.setPlanner(savedPlanner);
		eventRepository.save(event1);

		Event event2 = new Event();
		event2.setTitle("Test Event 2");
		event2.setDescription("Test Event Description 2");
		event2.setDate(LocalDateTime.now().plusDays(20));
		event2.setPlanner(savedPlanner);
		eventRepository.save(event2);

		// Perform a GET request to retrieve events for the planner
		mockMvc.perform(get("/api/planner/events")
						.param("plannerId", String.valueOf(savedPlanner.getId()))
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].title").value(event1.getTitle()))
				.andExpect(jsonPath("$[0].description").value(event1.getDescription()))
				.andExpect(jsonPath("$[0].date").exists())
				.andExpect(jsonPath("$[1].title").value(event2.getTitle()))
				.andExpect(jsonPath("$[1].description").value(event2.getDescription()))
				.andExpect(jsonPath("$[1].date").exists());
	}

	@Test
	@WithMockUser(username = "testPlanner", roles = {"PLANNER"})
	public void testCreateTask() throws Exception {
		// Create a task object for testing
		Task task = new Task();
		task.setDescription("Test Task Description");
		task.setStatus("Pending");

		// Perform a POST request to create the task
		mockMvc.perform(post("/api/planner/task")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(task)))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.description").value(task.getDescription()))
				.andExpect(jsonPath("$.status").value(task.getStatus()));

		// Assert the task is created in the database
		Task savedTask = taskRepository.findAll().get(0);
		assertEquals(task.getDescription(), savedTask.getDescription());
		assertEquals(task.getStatus(), savedTask.getStatus());
	}

	@Test
	@WithMockUser(username = "testPlanner", roles = {"PLANNER"})
	public void testGetAllTasks() throws Exception {
		// Create and save a couple of tasks for testing
		Task task1 = new Task();
		task1.setDescription("Test Task Description 1");
		task1.setStatus("Pending");
		taskRepository.save(task1);

		Task task2 = new Task();
		task2.setDescription("Test Task Description 2");
		task2.setStatus("Completed");
		taskRepository.save(task2);

		// Perform a GET request to retrieve all tasks
		mockMvc.perform(get("/api/planner/tasks")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].description").value(task1.getDescription()))
				.andExpect(jsonPath("$[0].status").value(task1.getStatus()))
				.andExpect(jsonPath("$[1].description").value(task2.getDescription()))
				.andExpect(jsonPath("$[1].status").value(task2.getStatus()));
	}

	@Test
	@WithMockUser(username = "testPlanner", roles = {"PLANNER"})
	public void testAssignTaskToStaff() throws Exception {
		// Create and save a task
		Task task = new Task();
		task.setDescription("Test Task Description");
		task.setStatus("Pending");
		task = taskRepository.save(task);

		// Create and save a staff member
		Staff staff = createStaff();

		// Perform a POST request to assign the task to the staff member
		mockMvc.perform(post("/api/planner/tasks/" + task.getId() + "/assign/" + staff.getId())
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(task.getId()))
				.andExpect(jsonPath("$.description").value(task.getDescription()))
				.andExpect(jsonPath("$.status").value(task.getStatus()))
				.andExpect(jsonPath("$.assignedStaff.id").value(staff.getId()));

		// Optional: Verify the task assignment in the database
		Task assignedTask = taskRepository.findById(task.getId()).orElse(null);
		assertNotNull(assignedTask);
		assertEquals(staff.getId(), assignedTask.getAssignedStaff().getId());
	}

	@Test
	@WithMockUser(username = "testStaff", roles = {"STAFF"})
	public void testStaffGetAssignedTasks() throws Exception {
		// Create and save a staff member
		Staff staff = createStaff();

		// Create and save a couple of tasks assigned to the staff member
		Task task1 = new Task();
		task1.setDescription("Test Task Description 1");
		task1.setStatus("Pending");
		task1.setAssignedStaff(staff);
		taskRepository.save(task1);

		Task task2 = new Task();
		task2.setDescription("Test Task Description 2");
		task2.setStatus("Completed");
		task2.setAssignedStaff(staff);
		taskRepository.save(task2);

		// Perform a GET request to retrieve tasks assigned to the staff member
		mockMvc.perform(get("/api/staff/tasks/" + staff.getId())
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].description").value(task1.getDescription()))
				.andExpect(jsonPath("$[0].status").value(task1.getStatus()))
				.andExpect(jsonPath("$[1].description").value(task2.getDescription()))
				.andExpect(jsonPath("$[1].status").value(task2.getStatus()));
	}

	@Test
	@WithMockUser(username = "testStaff", roles = {"STAFF"})
	public void testUpdateTaskStatus() throws Exception {
		// Create and save a task
		Task task = new Task();
		task.setDescription("Test Task Description");
		task.setStatus("Pending");
		task = taskRepository.save(task);

		// Perform a PUT request to update the task status
		String updatedStatus = "Completed";
		mockMvc.perform(put("/api/staff/tasks/" + task.getId())
						.param("status", updatedStatus)
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(task.getId()))
				.andExpect(jsonPath("$.description").value(task.getDescription()))
				.andExpect(jsonPath("$.status").value(updatedStatus));

		// Optional: Verify the updated task status in the database
		Task updatedTask = taskRepository.findById(task.getId()).orElse(null);
		assertNotNull(updatedTask);
		assertEquals(updatedStatus, updatedTask.getStatus());
	}

	@Test
	@WithMockUser(username = "testPlanner", roles = {"CLIENT"})
	public void testClientShouldGetAllEvents() throws Exception {
		EventPlanner planner = createEventPlanner();
		// Create and save a couple of events
		Event event1 = new Event();
		event1.setTitle("Test Event 1");
		event1.setDescription("Test Event Description 1");
		event1.setStatus("Pending");
		event1.setLocation("Test Location 1");
		event1.setPlanner(planner);
		eventRepository.save(event1);

		Event event2 = new Event();
		event2.setTitle("Test Event 2");
		event2.setDescription("Test Event Description 2");
		event2.setStatus("Pending");
		event2.setLocation("Test Location 1");
		event2.setPlanner(planner);
		eventRepository.save(event2);

		// Perform a GET request to retrieve all events
		mockMvc.perform(get("/api/client/events")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].title").value(event1.getTitle()))
				.andExpect(jsonPath("$[0].description").value(event1.getDescription()))
				.andExpect(jsonPath("$[0].planner.id").value(planner.getId()))
				.andExpect(jsonPath("$[1].title").value(event2.getTitle()))
				.andExpect(jsonPath("$[1].description").value(event2.getDescription()))
				.andExpect(jsonPath("$[1].planner.id").value(planner.getId()));
	}


	@Test
	@WithMockUser(username = "testClient", roles = {"CLIENT"})
	public void testUpdateFeedback() throws Exception {
		EventPlanner planner = createEventPlanner();
		// Create and save an event
		Event event = new Event();
		event.setTitle("Test Event");
		event.setDescription("Test Event Description");
		event.setPlanner(planner);
		event.setFeedback("test feedback");
		event = eventRepository.save(event);

		// Feedback to be added
		String feedback = "This event was great!";

		// Perform a POST request to update feedback for the event
		mockMvc.perform(put("/api/client/event/{eventId}", event.getId())
						.contentType(MediaType.APPLICATION_JSON)
				.param("feedback", feedback))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(event.getId()))
				.andExpect(jsonPath("$.feedback").value(feedback));

		// Optional: Verify the updated event in the database
		Event updatedEvent = eventRepository.findById(event.getId()).orElse(null);
		assertNotNull(updatedEvent);
		assertEquals(feedback, updatedEvent.getFeedback());
	}

	
	



	private Staff createStaff() {
		User user = new User();
		user.setUsername("testUser");
		user.setPassword("testPassword");
		user.setEmail("test@gmail.com");
		user.setRole("PLANNER");
		User staff = new Staff();
		staff.setUsername("testUser");
		staff.setPassword("testPassword");
		staff.setEmail("test@gmail.com");
		staff.setRole("PLANNER");
		return staffRepository.save((Staff) staff);
	}



	private EventPlanner createEventPlanner() {
		// Create an EventPlanner object for registration
		User user = new User();
		user.setUsername("testUser");
		user.setPassword("testPassword");
		user.setEmail("test@gmail.com");
		user.setRole("PLANNER");
		User planner = new EventPlanner();
		planner.setUsername("testUser");
		planner.setPassword("testPassword");
		planner.setEmail("test@gmail.com");
		planner.setRole("PLANNER");
		return eventPlannerRepository.save((EventPlanner) planner);
	}



}
