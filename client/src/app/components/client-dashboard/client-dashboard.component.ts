
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Event } from '../../models/event.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ClientDashboardComponent implements OnInit {
  [x: string]: any;
  events: Event[] = [];
  sortOrder: 'asc' | 'desc' = 'asc';
  searchTitle: string = '';
  paginatedList: any = []; // Items for the current page
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 3; // Number of items per page


  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.getEvents();

  }

  getEvents() {
    this.clientService.getEvents().subscribe(
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
 
  provideFeedback(eventId: any, feedback: string) {
    let timerInterval: NodeJS.Timeout | number;
    Swal.fire({
      title: 'Submitting Feedback',
      html: 'Please wait <b></b> milliseconds.',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (timer) {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval as NodeJS.Timeout);
      }
    });
  
    this.clientService.provideFeedback(eventId, feedback).subscribe(
      response => {
        console.log('Feedback submitted successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Feedback submitted successfully.',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error => {
        console.error('Error submitting feedback:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error submitting feedback. Please try again.',
        });
      }
    );
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
    this.router.navigate(['/login']);
  }

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
}