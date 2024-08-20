import { Component, OnInit } from '@angular/core';
import { PlannerService } from '../../services/planner.service';
import { Event } from '../../models/event.model';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import Swal from 'sweetalert2';

import { StaffService } from '../../services/staff.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-planner-dashboard',
  templateUrl: './planner-dashboard.component.html',
  styleUrls: ['./planner-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})

export class PlannerDashboardComponent implements OnInit {


  showEvents: boolean = false;
  showTasks: boolean = false;
  welcome: boolean = true;
  // createevent: boolean = true;
  // eventlist: boolean = false;
  createeevent: boolean = true;
  createtasksss: boolean = true;
  eventslist: boolean = true;
  taskslist: boolean = false;
  events: Event[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  tasks: Task[] = [];
  staffs: User[] = [];
  newEvent: Event = {
    title: '',
    date: '',
    location: '',
    description: '',
    status: ''
  };
  newTask: Task = {
    description: '',
    status: '',
    assignedStaff: ''
  };
  selectedEvent: Event | null = null;
  selectedTask: Task | null = null;
  minDate: any;

  paginatedList: any = []; // Items for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 2; // Number of items per page

  constructor(private plannerService: PlannerService, private staffService: StaffService, private router: Router) { }


  ngOnInit() {
    this.getEvents();
    this.getTasks();
    this.getStaff();
    this.setMinDate();
  }


  createEvent() {
    console.log('Event to be created:', this.newEvent); // Log the event data
    this.plannerService.createEvent(this.newEvent).subscribe(
      response => {
        this.createeevent = false;
        this.eventslist = true;
        console.log('Event created successfully:', response);
        this.getEvents();
        this.newEvent = { title: '', date: '', location: '', description: '', status: '' };
        Swal.fire('Success', 'Event created successfully', 'success');
      },
      error => {
        console.error('Event creation error:', error);
        if (error.error && error.error.message) {
          console.error('Server error message:', error.error.message);
        }
        Swal.fire('Error', 'Failed to create event. Please try again.', 'error');
      }
    );
  }


  updateEvent(event: Event, eventId: string | undefined) {
    if (event && eventId) {
      this.plannerService.updateEvent(event, eventId).subscribe(
        response => {
          console.log('Event updated successfully:', response);
          this.getEvents();
          

          Swal.fire({
            title: "Success!",
            text: "Event updated successfully.",
            icon: "success"
          });
          this.selectedEvent = null;
        },
        error => {
          console.error('Event update error:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to update event. Please try again.",
            icon: "error"
          });
        }
      );
    } else {
      console.error('Event or event ID is missing.');
      Swal.fire({
        title: "Error!",
        text: "Event or event ID is missing.",
        icon: "error"
      });
    }
  }


  getEvents() {
    this.plannerService.getEvents().subscribe(
      response => {
        this.events = response;
        this.updatePaginatedList();
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.events.slice(startIndex, endIndex);
  }
 
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return; // Prevent navigation to invalid pages
    }
    this.currentPage = page;
    this.updatePaginatedList();
  }
 
  get totalPages(): number {
    return Math.ceil(this.events.length / this.itemsPerPage);
  }

  createTask() {
    this.plannerService.createTask(this.newTask).subscribe(

      response => {
        this.createtasksss = false;
        this.taskslist = true;
        console.log('Task created successfully:', response);
        this.getTasks();
        this.newTask = { description: '', status: '', assignedStaff: '' };
      },
      error => {
        console.error('Task creation error:', error);
      }
    );
  }

  getTasks() {
    this.plannerService.getTasks().subscribe(
      response => {
        this.tasks = response;
      },
      error => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  editEvent(event: Event) {
    this.selectedEvent = { ...event };
    this.showEvents = true;
    this.showTasks = false;
  }

  getStaff() {
    this.staffService.getStaff().subscribe(
      response => {
        this.staffs = response;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );

  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    if (route === 'welcome') {
      this.showEvents = false;
      this.showTasks = false;
      this.welcome = true;
      this.eventslist = false;
      this.createeevent = false;
    } else if (route === 'manage-tasks') {
      this.showEvents = false;
      this.showTasks = true;
      this.welcome = false;
      this.eventslist = false;
      this.taskslist = false;
      this.createtasksss = true
    } else if (route === 'manage-events') {
      this.welcome = false;
      this.showEvents = true;
      this.showTasks = false;
      this.eventslist = false;
      this.createeevent = true;
      this.createtasksss = false
    } else if (route === 'eventslist') {
      this.welcome = false;
      this.showEvents = true;
      this.showTasks = false;
      this.eventslist = true;
      this.createeevent = false;
      this.createtasksss = false
    } else if (route === 'taskslist') {
      this.welcome = false;
      this.showEvents = false;
      this.showTasks = true;
      this.eventslist = false;
      this.createeevent = false;
      this.taskslist = true;
      this.createtasksss = false
    }
  }

  setMinDate() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    this.minDate = today.toISOString().slice(0, 16);
  }

  searchTitle: string = '';
  search() {
    if (this.searchTitle.trim().length != 0) {
      this.events = this.events.filter(p => {
        return p.title.toLowerCase().includes(this.searchTitle.toLowerCase());
      })
    } else {
      this.getEvents();
    }
    this.currentPage = 1; // Reset to first page after search
    this.updatePaginatedList();


  }

  sortEventsByDate() {
    this.events.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    this.updatePaginatedList();
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortEventsByDate();
  }

  deleteEvent(eventId: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.plannerService.deleteEvent(eventId).subscribe({
          next: () => {
            this.getEvents();
            Swal.fire({
              title: "Deleted!",
              text: "The event has been deleted.",
              icon: "success"
            });
          },
          error: (error) => {
            console.error('Error deleting event:', error);
            Swal.fire({
              title: "Error!",
              text: "There was a problem deleting the event.",
              icon: "error"
            });
          }
        });
      }
    });
  }

 


}
