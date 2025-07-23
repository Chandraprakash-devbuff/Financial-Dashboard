import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { ChartComponent } from '../chart/chart.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DrillDownModalComponent } from '../drill-down-modal/drill-down-modal.component';
import { DashboardService } from '../../services/dashboard.service';
import { DrillDownData } from '../../models/dashboard.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, ChartComponent, DataTableComponent, DrillDownModalComponent, FormsModule],
  template: `
    <div class="dashboard-container animate-fadeInUp">
      <!-- Header -->
      <div class="dashboard-header glass-effect">
        <div class="header-content">
          <h1 class="dashboard-title text-gradient">Financial Analytics</h1>
          <p class="dashboard-subtitle">Real-time insights across 14+ cities</p>
        </div>
        <div class="header-controls">
          <select class="period-selector glass-effect" [(ngModel)]="selectedPeriod" (change)="onPeriodChange()">
            <option value="day">Per Day</option>
            <option value="mtd">Month to Date</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button class="refresh-btn glass-effect" (click)="refreshData()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            Refresh
          </button>
        </div>
      </div>

      <!-- KPI Cards Row 1 -->
      <div class="kpi-grid">
        <app-kpi-card
          [title]="'Total Revenue'"
          [value]="dashboardData.totalRevenue || 0"
          [trend]="dashboardData.revenueTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'success'"
          [kpiType]="'totalRevenue'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Cash Collection'"
          [value]="dashboardData.totalCashCollection || 0"
          [trend]="dashboardData.cashTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'warning'"
          [kpiType]="'cashCollection'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Card Collection'"
          [value]="dashboardData.totalCardCollection || 0"
          [trend]="dashboardData.cardTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'info'"
          [kpiType]="'cardCollection'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Digital Collection'"
          [value]="dashboardData.totalDigitalCollection || 0"
          [trend]="dashboardData.digitalTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'success'"
          [kpiType]="'digitalCollection'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>
        <app-kpi-card
          [title]="'Consulting Fees'"
          [value]="dashboardData.totalConsultingFees || 0"
          [trend]="dashboardData.consultingTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'info'"
          [kpiType]="'consultingFees'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Surgical Revenue'"
          [value]="dashboardData.totalSurgicalRevenue || 0"
          [trend]="dashboardData.surgicalTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'success'"
          [kpiType]="'surgicalRevenue'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Avg Revenue/Patient'"
          [value]="dashboardData.avgRevenuePerPatient || 0"
          [trend]="dashboardData.avgRevenueTrend || 0"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'info'"
          [kpiType]="'avgRevenue'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Digital Payment %'"
          [value]="dashboardData.digitalPaymentPercentage || 0"
          [trend]="dashboardData.digitalPercentTrend || 0"
          [period]="selectedPeriod"
          [format]="'percentage'"
          [trendColor]="'success'"
          [kpiType]="'digitalPercent'"
          (cardClick)="onKpiCardClick($event)">
        </app-kpi-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-grid">
        <div class="chart-card glass-effect">
          <app-chart
            [title]="'City-wise Revenue Distribution'"
            [data]="dashboardData.revenueChartData"
            [type]="'line'"
            [height]="300">
          </app-chart>
        </div>

        <div class="chart-card glass-effect">
          <app-chart
            [title]="'Payment Modes'"
            [data]="dashboardData.paymentModeData"
            [type]="'doughnut'"
            [height]="300">
          </app-chart>
        </div>
      </div>

      <!-- Data Tables Section -->
      <div class="tables-grid">
        <div class="table-card glass-effect">
          <app-data-table
            [title]="'City-wise Revenue Breakdown'"
            [data]="dashboardData.cityRevenueData"
            [columns]="cityRevenueColumns">
          </app-data-table>
        </div>

        <div class="table-card glass-effect">
          <app-data-table
            [title]="'Top Performing Cities'"
            [data]="getTopCities()"
            [columns]="topCitiesColumns">
          </app-data-table>
        </div>
      </div>

      <!-- Drill Down Modal -->
      <app-drill-down-modal
        [data]="drillDownData"
        [isVisible]="showDrillDown"
        (close)="closeDrillDown()">
      </app-drill-down-modal>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding: 32px;
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      flex: 1;
    }

    .dashboard-title {
      margin: 0;
      font-size: 36px;
      font-weight: 800;
      line-height: 1.2;
    }

    .dashboard-subtitle {
      margin: 8px 0 0 0;
      color: #64748b;
      font-size: 16px;
      font-weight: 400;
    }

    .header-controls {
      display: flex;
      gap: 16px;
      align-items: center;
    }

    .period-selector {
      padding: 12px 16px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 12px;
      font-size: 14px;
      background: rgba(255, 255, 255, 0.8);
      color: #1e293b;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .period-selector:hover {
      border-color: rgba(59, 130, 246, 0.3);
      background: rgba(255, 255, 255, 0.9);
    }

    .period-selector option {
      background: #ffffff;
      color: #1e293b;
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
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
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
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      min-height: 400px;
      transition: all 0.3s ease;
    }

    .chart-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .tables-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }

    .table-card {
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
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
      
      .tables-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  selectedPeriod = 'mtd';
  dashboardData: any = {};
  showDrillDown = false;
  drillDownData: DrillDownData | null = null;
  
  cityRevenueColumns = [
    { key: 'city', label: 'City' },
    { key: 'revenue', label: 'Total Revenue', format: 'currency' },
    { key: 'cash', label: 'Cash', format: 'currency' },
    { key: 'card', label: 'Card', format: 'currency' },
    { key: 'digital', label: 'Digital', format: 'currency' }
  ];

  topCitiesColumns = [
    { key: 'city', label: 'City' },
    { key: 'revenue', label: 'Revenue', format: 'currency' },
    { key: 'growth', label: 'Growth', format: 'percentage' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
    
    // Add some entrance animation delay
    setTimeout(() => {
      document.querySelector('.dashboard-container')?.classList.add('animate-fadeInUp');
    }, 100);
  }

  onPeriodChange() {
    this.loadDashboardData();
  }

  refreshData() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.dashboardData = this.dashboardService.getDashboardData(this.selectedPeriod);
  }

  onKpiCardClick(kpiType: string) {
    this.drillDownData = this.dashboardService.getDrillDownData(kpiType);
    this.showDrillDown = true;
  }

  closeDrillDown() {
    this.showDrillDown = false;
    this.drillDownData = null;
  }

  getTopCities() {
    return this.dashboardData.cityRevenueData
      ?.sort((a: any, b: any) => b.revenue - a.revenue)
      .slice(0, 5)
      .map((city: any, index: number) => ({
        ...city,
        growth: (Math.random() * 20 - 5).toFixed(1) // Simulated growth percentage
      })) || [];
  }
}