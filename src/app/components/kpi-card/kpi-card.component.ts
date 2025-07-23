import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kpi-card glass-effect" 
         [class]="'kpi-card--' + trendColor"
         (click)="onCardClick()"
         [class.clickable]="clickable">
      
      <!-- Animated background gradient -->
      <div class="kpi-bg-gradient"></div>
      
      <!-- Header -->
      <div class="kpi-header">
        <div class="kpi-title-section">
          <h3 class="kpi-title">{{title}}</h3>
          <span class="kpi-period">{{getPeriodLabel()}}</span>
        </div>
        <div class="kpi-icon" [class]="'kpi-icon--' + trendColor">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
          </svg>
        </div>
      </div>
      
      <!-- Main Content -->
      <div class="kpi-content">
        <div class="kpi-value-section">
          <div class="kpi-value mono">
            {{getFormattedValue()}}
            <span *ngIf="suffix" class="kpi-suffix">{{suffix}}</span>
          </div>
          
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
        
        <!-- Progress bar for visual appeal -->
        <div class="kpi-progress">
          <div class="progress-bar" [style.width.%]="getProgressWidth()"></div>
        </div>
      </div>
      
      <!-- Click indicator -->
      <div class="click-indicator" *ngIf="clickable">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
        </svg>
      </div>
    </div>
  `,
  styles: [`
    .kpi-card {
      position: relative;
      border-radius: 16px;
      padding: 24px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid rgba(148, 163, 184, 0.2);
      overflow: hidden;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .kpi-card.clickable {
      cursor: pointer;
    }

    .kpi-card:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.3);
      border-color: rgba(59, 130, 246, 0.3);
    }

    .kpi-bg-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        rgba(59, 130, 246, 0.05) 0%, 
        rgba(139, 92, 246, 0.03) 50%, 
        rgba(236, 72, 153, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }

    .kpi-card:hover .kpi-bg-gradient {
      opacity: 1;
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
      position: relative;
      z-index: 1;
    }

    .kpi-title-section {
      flex: 1;
    }

    .kpi-title {
      margin: 0;
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      line-height: 1.2;
    }

    .kpi-period {
      display: inline-block;
      font-size: 11px;
      color: #475569;
      background: rgba(148, 163, 184, 0.1);
      padding: 4px 8px;
      border-radius: 6px;
      margin-top: 4px;
      font-weight: 500;
    }

    .kpi-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .kpi-icon--success { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .kpi-icon--danger { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
    .kpi-icon--warning { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .kpi-icon--info { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }

    .kpi-content {
      position: relative;
      z-index: 1;
      flex: 1;
    }

    .kpi-value-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 16px;
    }

    .kpi-value {
      font-size: 32px;
      font-weight: 800;
      color: #1e293b;
      display: flex;
      align-items: baseline;
      line-height: 1;
    }

    .kpi-suffix {
      font-size: 16px;
      font-weight: 500;
      color: #64748b;
      margin-left: 6px;
    }

    .kpi-trend {
      display: flex;
      align-items: center;
    }

    .trend-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s ease;
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

    .kpi-progress {
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      border-radius: 2px;
      transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .progress-bar::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s infinite;
    }

    .click-indicator {
      position: absolute;
      top: 16px;
      right: 16px;
      color: #94a3b8;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 2;
    }

    .kpi-card.clickable:hover .click-indicator {
      opacity: 1;
      transform: translateX(2px);
    }

    @media (max-width: 768px) {
      .kpi-card {
        padding: 20px;
        min-height: 140px;
      }
      
      .kpi-value {
        font-size: 28px;
      }
      
      .kpi-title {
        font-size: 13px;
      }
    }
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
  @Input() clickable = true;
  @Input() kpiType = '';
  
  @Output() cardClick = new EventEmitter<string>();

  onCardClick() {
    if (this.clickable) {
      this.cardClick.emit(this.kpiType);
    }
  }

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
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        notation: this.value >= 10000000 ? 'compact' : 'standard'
      }).format(this.value);
    } else if (this.format === 'percentage') {
      return this.value.toFixed(1) + '%';
    } else {
      return new Intl.NumberFormat('en-IN', {
        notation: this.value >= 10000 ? 'compact' : 'standard'
      }).format(this.value);
    }
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

  getProgressWidth(): number {
    // Calculate progress based on value relative to a max (for visual appeal)
    const maxValue = this.value * 1.2; // 20% more than current value
    return Math.min((this.value / maxValue) * 100, 100);
  }
}