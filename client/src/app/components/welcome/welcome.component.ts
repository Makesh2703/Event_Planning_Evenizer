import { Component } from '@angular/core';
import { PlannerDashboardComponent } from "../planner-dashboard/planner-dashboard.component";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [PlannerDashboardComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
