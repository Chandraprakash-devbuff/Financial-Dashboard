import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardComponent } from './app/components/dashboard/dashboard.component';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(DashboardComponent, {
  providers: [
    importProvidersFrom(FormsModule)
  ]
});