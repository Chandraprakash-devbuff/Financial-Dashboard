import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../kpi-card/kpi-card.component';
import { ChartComponent } from '../chart/chart.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { DashboardService } from '../../services/dashboard.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, KpiCardComponent, ChartComponent, DataTableComponent, FormsModule],
  template: `
    <div class="dashboard-container">
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Financial Dashboard</h1>
        <div class="header-controls">
          <select [(ngModel)]="selectedPeriod" (change)="onPeriodChange()">
            <option value="day">Per Day</option>
            <option value="mtd">Month to Date</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button class="refresh-btn" (click)="refreshData()">Refresh</button>
        </div>
      </div>

      <!-- KPI Cards Row 1 -->
      <div class="kpi-row">
        <app-kpi-card
          [title]="'Total Revenue'"
          [value]="dashboardData.totalRevenue"
          [trend]="dashboardData.revenueTrend"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'success'">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Total Expenses'"
          [value]="dashboardData.totalExpenses"
          [trend]="dashboardData.expensesTrend"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'danger'">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Net Operating Income'"
          [value]="dashboardData.netIncome"
          [trend]="dashboardData.netIncomeTrend"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="dashboardData.netIncome >= 0 ? 'success' : 'danger'">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Avg Revenue Per Patient'"
          [value]="dashboardData.avgRevenuePerPatient"
          [trend]="dashboardData.avgRevenueTrend"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'info'">
        </app-kpi-card>
      </div>

      <!-- KPI Cards Row 2 -->
      <div class="kpi-row">
        <app-kpi-card
          [title]="'Reconciliation %'"
          [value]="dashboardData.reconciliationPercentage"
          [trend]="dashboardData.reconciliationTrend"
          [period]="selectedPeriod"
          [format]="'percentage'"
          [trendColor]="'success'">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Cash on Hand'"
          [value]="dashboardData.cashOnHand"
          [trend]="dashboardData.cashTrend"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'info'">
        </app-kpi-card>

        <app-kpi-card
          [title]="'Bank Balance'"
          [value]="dashboardData.bankBalance"
          [trend]="dashboardData.bankTrend"
          [period]="selectedPeriod"
          [format]="'currency'"
          [trendColor]="'success'">
        </app-kpi-card>

        <app-kpi-card
          [title]="'AR Days'"
          [value]="dashboardData.arDays"
          [trend]="dashboardData.arDaysTrend"
          [period]="selectedPeriod"
          [format]="'number'"
          [suffix]="'days'"
          [trendColor]="'warning'">
        </app-kpi-card>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-container">
          <app-chart
            [title]="'Revenue Trend'"
            [data]="dashboardData.revenueChartData"
            [type]="'line'"
            [height]="300">
          </app-chart>
        </div>

        <div class="chart-container">
          <app-chart
            [title]="'Payment Modes'"
            [data]="dashboardData.paymentModeData"
            [type]="'doughnut'"
            [height]="300">
          </app-chart>
        </div>
      </div>

      <!-- Data Tables Section -->
      <div class="tables-section">
        <div class="table-container">
          <app-data-table
            [title]="'Payment Mode Breakdown'"
            [data]="dashboardData.paymentModeBreakdown"
            [columns]="paymentModeColumns">
          </app-data-table>
        </div>

        <div class="table-container">
          <app-data-table
            [title]="'Bank Account Summary'"
            [data]="dashboardData.bankAccountSummary"
            [columns]="bankAccountColumns">
          </app-data-table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      background-color: #f5f7fa;
      min-height: 100vh;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .dashboard-header h1 {
      margin: 0;
      color: #2c3e50;
      font-size: 28px;
      font-weight: 600;
    }

    .header-controls {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .header-controls select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
    }

    .refresh-btn {
      background: #3498db;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s;
    }

    .refresh-btn:hover {
      background: #2980b9;
    }

    .kpi-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .charts-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      margin-bottom: 30px;
    }

    .chart-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .tables-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    @media (max-width: 768px) {
      .kpi-row {
        grid-template-columns: 1fr;
      }
      
      .charts-section {
        grid-template-columns: 1fr;
      }
      
      .tables-section {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  selectedPeriod = 'mtd';
  dashboardData: any = {};
  
  paymentModeColumns = [
    { key: 'mode', label: 'Payment Mode' },
    { key: 'amount', label: 'Amount', format: 'currency' },
    { key: 'percentage', label: 'Percentage', format: 'percentage' },
    { key: 'transactions', label: 'Transactions' }
  ];

  bankAccountColumns = [
    { key: 'accountName', label: 'Account Name' },
    { key: 'accountNumber', label: 'Account Number' },
    { key: 'balance', label: 'Balance', format: 'currency' },
    { key: 'lastUpdated', label: 'Last Updated', format: 'date' }
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
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
}