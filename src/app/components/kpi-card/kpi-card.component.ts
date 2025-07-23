import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card" [class]="'kpi-card--' + trendColor">
      <div class="kpi-header">
        <h3 class="kpi-title">{{title}}</h3>
        <div class="kpi-icon" [class]="'kpi-icon--' + trendColor">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
      </div>
      
      <div class="kpi-content">
        <div class="kpi-value mono">{{getFormattedValue()}}</div>
        
        <div class="kpi-trend" *ngIf="trend !== null">
          <div class="trend-indicator" [class]="getTrendClass()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path *ngIf="trend > 0" d="M7 14l5-5 5 5z"/>
              <path *ngIf="trend < 0" d="M7 10l5 5 5-5z"/>
              <path *ngIf="trend === 0" d="M8 12h8"/>
            </svg>
            <span class="trend-value mono">{{getTrendValue()}}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 24px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      min-height: 160px;
    }

    .kpi-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .kpi-card--success { border-left: 4px solid #10b981; }
    .kpi-card--danger { border-left: 4px solid #ef4444; }
    .kpi-card--warning { border-left: 4px solid #f59e0b; }
    .kpi-card--info { border-left: 4px solid #3b82f6; }

    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    .kpi-title {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .kpi-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .kpi-icon--success { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .kpi-icon--danger { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .kpi-icon--warning { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .kpi-icon--info { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }

    .kpi-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .kpi-value {
      font-size: 28px;
      font-weight: 800;
      color: #1e293b;
    }

    .trend-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
    }

    .trend-indicator.positive { 
      background: rgba(16, 185, 129, 0.2); 
      color: #10b981; 
    }
    .trend-indicator.negative { 
      background: rgba(239, 68, 68, 0.2); 
      color: #ef4444; 
    }
    .trend-indicator.neutral { 
      background: rgba(148, 163, 184, 0.2); 
      color: #94a3b8; 
    }
  `]
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() trend: number | null = null;
  @Input() format = 'currency';
  @Input() trendColor = 'info';

  getFormattedValue(): string {
    if (this.format === 'currency') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: this.value >= 10000000 ? 'compact' : 'standard'
      }).format(this.value);
    }
    return this.value.toLocaleString();
  }

  getTrendClass(): string {
    if (this.trend === null) return 'neutral';
    return this.trend > 0 ? 'positive' : this.trend < 0 ? 'negative' : 'neutral';
  }

  getTrendValue(): string {
    if (this.trend === null) return '';
    return `${Math.abs(this.trend).toFixed(1)}%`;
  }
}