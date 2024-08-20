import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Routes
import { AppRoutingModule } from './app.routes';

// Services and Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PlannerDashboardComponent } from './components/planner-dashboard/planner-dashboard.component';
import { StaffDashboardComponent } from './components/staff-dashboard/staff-dashboard.component';
import { ClientDashboardComponent } from './components/client-dashboard/client-dashboard.component';

// Interceptor
import { httpClientProviders } from './http-client-providers';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RegisterComponent,
    LoginComponent,
    AppComponent,
    //ReactiveFormsModule,
    PlannerDashboardComponent,
    StaffDashboardComponent,
    ClientDashboardComponent,
    WelcomeComponent
  ],
  providers: [
    httpClientProviders // Add the providers here
  ],
  // bootstrap: [AppComponent]
})
export class AppModule { }
