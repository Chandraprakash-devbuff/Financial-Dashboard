import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DashboardComponent,
  ],
  providers: [DashboardService],
})
export class AppModule { }