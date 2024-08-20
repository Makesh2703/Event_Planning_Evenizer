import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientService } from "../../services/client.service";
import { Event } from "/home/ubuntu/root/client/src/app/models/event.model";
import { CommonModule } from '@angular/common';
 
 
@Component({
    selector: 'app-home-dashboard',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [CommonModule]
  })

  export class HomeComponent implements OnInit{
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }
  }