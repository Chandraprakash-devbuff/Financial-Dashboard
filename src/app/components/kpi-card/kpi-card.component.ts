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
        <span class="kpi-period">{{getPeriodLabel()}}</span>
      </div>
      
      <div class="kpi-content">
        <div class="kpi-value">
          {{getFormattedValue()}}
          <span *ngIf="suffix" class="kpi-suffix">{{suffix}}</span>
        </div>
        
        <div class="kpi-trend" *ngIf="trend !== null">
          <span class="trend-icon" [class]="getTrendClass()">
            {{getTrendIcon()}}
          </span>
          <span class="trend-value">{{getTrendValue()}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      border-left: 4px solid #3498db;
    }

    .kpi-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }

    .kpi-card--success { border-left-color: #27ae60; }
    .kpi-card--danger { border-left-color: #e74c3c; }
    .kpi-card--warning { border-left-color: #f39c12; }
    .kpi-card--info { border-left-color: #3498db; }

    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .kpi-title {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .kpi-period {
      font-size: 12px;
      color: #95a5a6;
      background: #ecf0f1;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .kpi-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .kpi-value {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
      display: flex;
      align-items: baseline;
    }

    .kpi-suffix {
      font-size: 14px;
      font-weight: 400;
      color: #7f8c8d;
      margin-left: 4px;
    }

    .kpi-trend {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .trend-icon {
      font-size: 16px;
      font-weight: bold;
    }

    .trend-icon.positive { color: #27ae60; }
    .trend-icon.negative { color: #e74c3c; }
    .trend-icon.neutral { color: #95a5a6; }

    .trend-value {
      font-size: 12px;
      font-weight: 600;
    }

    .trend-value.positive { color: #27ae60; }
    .trend-value.negative { color: #e74c3c; }
    .trend-value.neutral { color: #95a5a6; }
  `]
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() trend: number | null = null;
  @Input() period = 'mtd';
  @Input() format = 'currency';
  @Input() suffix = '';
  @Input() trendColor = 'info';

  getPeriodLabel(): string {
    const labels: any = {
      'day': 'Today',
      'mtd': 'MTD',
      'ytd': 'YTD'
    };
    return labels[this.period] || 'MTD';
  }

  getFormattedValue(): string {
    if (this.format === 'currency') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(this.value);
    } else if (this.format === 'percentage') {
      return this.value.toFixed(1) + '%';
    } else {
      return new Intl.NumberFormat('en-US').format(this.value);
    }
  }

  getTrendIcon(): string {
    if (this.trend === null) return '';
    return this.trend > 0 ? '↗' : this.trend < 0 ? '↘' : '→';
  }

  getTrendClass(): string {
    if (this.trend === null) return 'neutral';
    return this.trend > 0 ? 'positive' : this.trend < 0 ? 'negative' : 'neutral';
  }

  getTrendValue(): string {
    if (this.trend === null) return '';
    const absValue = Math.abs(this.trend);
    return `${absValue.toFixed(1)}%`;
  }
}