import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PlannerDashboardComponent } from './components/planner-dashboard/planner-dashboard.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home-dashboard/home.component';


export const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'home', component:HomeComponent},
  { path: '', component: HomeComponent },
  { path: 'planner-dashboard', component: PlannerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'staff-dashboard', component: StaffDashboardComponent, canActivate: [AuthGuard] },
  { path: 'client-dashboard', component: ClientDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
