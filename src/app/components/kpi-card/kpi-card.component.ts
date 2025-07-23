import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card" [class]="'kpi-card--' + trendColor" (click)="onCardClick()">
      <div class="kpi-header">
        <h3 class="kpi-title">{{title}}</h3>
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
      
      <div class="drill-down-hint">
        <span>Click to drill down</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
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
      cursor: pointer;
      position: relative;
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

    .kpi-content {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 16px;
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

    .drill-down-hint {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      color: #64748b;
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .kpi-card:hover .drill-down-hint {
      opacity: 1;
    }
  `]
})
export class KpiCardComponent {
  @Input() title!: string;
  @Input() value!: number;
  @Input() trend: number | null = null;
  @Input() format = 'currency';
  @Input() trendColor = 'info';
  @Input() kpiType!: string;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick() {
    this.cardClick.emit(this.kpiType);
  }

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