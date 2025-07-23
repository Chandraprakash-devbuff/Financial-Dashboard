import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { ChartComponent } from '../chart/chart.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, ChartComponent, DataTableComponent],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="dashboard-title">Financial Analytics Dashboard</h1>
          <p class="dashboard-subtitle">Real-time insights across 15+ cities</p>
        </div>
        <div class="header-controls">
          <button class="refresh-btn" (click)="refreshData()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid">
        <app-kpi-card
          title="Total Revenue"
          [value]="dashboardData.totalRevenue || 0"
          [trend]="dashboardData.revenueTrend || 0"
          format="currency"
          trendColor="success">
        </app-kpi-card>

        <app-kpi-card
          title="Cash Collection"
          [value]="dashboardData.totalCashCollection || 0"
          [trend]="dashboardData.cashTrend || 0"
          format="currency"
          trendColor="warning">
        </app-kpi-card>

        <app-kpi-card
          title="Card Collection"
          [value]="dashboardData.totalCardCollection || 0"
          [trend]="dashboardData.cardTrend || 0"
          format="currency"
          trendColor="info">
        </app-kpi-card>

        <app-kpi-card
          title="Digital Collection"
          [value]="dashboardData.totalDigitalCollection || 0"
          [trend]="dashboardData.digitalTrend || 0"
          format="currency"
          trendColor="success">
        </app-kpi-card>

        <app-kpi-card
          title="Consulting Fees"
          [value]="dashboardData.totalConsultingFees || 0"
          [trend]="dashboardData.consultingTrend || 0"
          format="currency"
          trendColor="info">
        </app-kpi-card>

        <app-kpi-card
          title="Surgical Revenue"
          [value]="dashboardData.totalSurgicalRevenue || 0"
          [trend]="dashboardData.surgicalTrend || 0"
          format="currency"
          trendColor="success">
        </app-kpi-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-grid">
        <div class="chart-card">
          <app-chart
            title="City-wise Revenue Distribution"
            [data]="dashboardData.revenueChartData"
            type="line">
          </app-chart>
        </div>

        <div class="chart-card">
          <app-chart
            title="Payment Modes"
            [data]="dashboardData.paymentModeData"
            type="doughnut">
          </app-chart>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-section">
        <div class="table-card">
          <app-data-table
            title="City-wise Revenue Breakdown"
            [data]="dashboardData.cityRevenueData"
            [columns]="cityRevenueColumns">
          </app-data-table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      min-height: 100vh;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding: 32px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .dashboard-title {
      margin: 0;
      font-size: 36px;
      font-weight: 800;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .dashboard-subtitle {
      margin: 8px 0 0 0;
      color: #64748b;
      font-size: 16px;
    }

    .refresh-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 12px;
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      background: rgba(59, 130, 246, 0.2);
      transform: translateY(-2px);
    }

    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
      margin-bottom: 40px;
    }

    .chart-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      min-height: 400px;
      transition: all 0.3s ease;
    }

    .chart-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .table-section {
      margin-top: 40px;
    }

    .table-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .table-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 16px;
      }
      
      .dashboard-header {
        flex-direction: column;
        gap: 20px;
        padding: 24px;
      }
      
      .dashboard-title {
        font-size: 28px;
      }
      
      .kpi-grid {
        grid-template-columns: 1fr;
      }
      
      .charts-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  
  cityRevenueColumns = [
    { key: 'city', label: 'City' },
    { key: 'revenue', label: 'Total Revenue', format: 'currency' },
    { key: 'cash', label: 'Cash', format: 'currency' },
    { key: 'card', label: 'Card', format: 'currency' },
    { key: 'digital', label: 'Digital', format: 'currency' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  refreshData() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.dashboardData = this.dashboardService.getDashboardData();
  }
}