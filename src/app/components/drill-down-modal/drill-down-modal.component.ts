import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrillDownData } from '../../models/dashboard.model';

@Component({
  selector: 'app-drill-down-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="onClose()" *ngIf="isVisible">
      <div
        class="modal-container glass-effect"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div class="modal-header">
          <div class="header-content">
            <h2 class="modal-title text-gradient">
              {{ data?.kpiTitle }} Analysis
            </h2>
            <p class="modal-subtitle">Detailed breakdown and comparison</p>
          </div>
          <button class="close-btn" (click)="onClose()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>

        <!-- Tabs -->
        <div class="tab-container">
          <button
            class="tab-btn"
            [class.active]="activeTab === 'comparison'"
            (click)="activeTab = 'comparison'"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25h-15V5.75h15v13.5zm0-15.75h-15c-1.1 0-2 .9-2 2v13.5c0 1.1.9 2 2 2h15c1.1 0 2-.9 2-2V5.75c0-1.1-.9-2-2-2z"
              />
            </svg>
            Comparison
          </button>
          <button
            class="tab-btn"
            [class.active]="activeTab === 'table'"
            (click)="activeTab = 'table'"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M10 4H4c-1.11 0-2 .89-2 2v3h8V4zm0 9H2v3c0 1.11.89 2 2 2h6v-5zm2 5h6c1.11 0 2-.89 2-2v-3h-8v5zm8-9V6c0-1.11-.89-2-2-2h-6v5h8z"
              />
            </svg>
            Data Table
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <!-- Comparison Tab -->
          <div
            *ngIf="activeTab === 'comparison'"
            class="comparison-view animate-fadeInUp"
          >
            <!-- Summary Cards -->
            <div class="summary-cards">
              <div class="summary-card glass-effect">
                <div class="summary-label">Current Period</div>
                <div class="summary-value mono">
                  {{ formatCurrency(data?.currentValue || 0) }}
                </div>
              </div>
              <div class="summary-card glass-effect">
                <div class="summary-label">Previous Period</div>
                <div class="summary-value mono">
                  {{ formatCurrency(data?.previousValue || 0) }}
                </div>
              </div>
              <div
                class="summary-card glass-effect"
                [class]="getTrendClass(data?.trend || 0)"
              >
                <div class="summary-label">Change</div>
                <div class="summary-value mono">
                  <span class="trend-icon">{{
                    getTrendIcon(data?.trend || 0)
                  }}</span>
                  {{ getTrendValue(data?.trend) }}%
                </div>
              </div>
            </div>

            <!-- City Comparison Chart -->
            <div class="city-comparison">
              <h3 class="section-title">City-wise Performance</h3>
              <div class="city-bars">
                <div
                  *ngFor="let city of data?.cityData"
                  class="city-bar-container"
                >
                  <div class="city-info">
                    <span class="city-name">{{ city.city }}</span>
                    <span
                      class="city-change"
                      [class]="getTrendClass(city.change)"
                    >
                      {{ city.change > 0 ? '+' : ''
                      }}{{ city.change.toFixed(1) }}%
                    </span>
                  </div>
                  <div class="city-bars-wrapper">
                    <div class="city-bar">
                      <div class="bar-label">Current</div>
                      <div class="bar-track">
                        <div
                          class="bar-fill current"
                          [style.width.%]="
                            getBarWidth(city.current, getMaxValue())
                          "
                        ></div>
                      </div>
                      <div class="bar-value mono">
                        {{ formatCurrency(city.current) }}
                      </div>
                    </div>
                    <div class="city-bar">
                      <div class="bar-label">Previous</div>
                      <div class="bar-track">
                        <div
                          class="bar-fill previous"
                          [style.width.%]="
                            getBarWidth(city.previous, getMaxValue())
                          "
                        ></div>
                      </div>
                      <div class="bar-value mono">
                        {{ formatCurrency(city.previous) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Table Tab -->
          <div
            *ngIf="activeTab === 'table'"
            class="table-view animate-fadeInUp"
          >
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th *ngFor="let key of getTableHeaders()">
                      {{ formatHeader(key) }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of data?.tableData; trackBy: trackByFn">
                    <td *ngFor="let key of getTableHeaders()">
                      {{ formatTableValue(row[key], key) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
      }

      .modal-container {
        width: 100%;
        max-width: 1200px;
        max-height: 90vh;
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .modal-header {
        padding: 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .header-content h2 {
        margin: 0;
        font-size: 28px;
        font-weight: 800;
      }

      .modal-subtitle {
        margin: 4px 0 0 0;
        color: #94a3b8;
        font-size: 14px;
      }

      .close-btn {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 10px;
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #94a3b8;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .close-btn:hover {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }

      .tab-container {
        display: flex;
        padding: 0 30px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .tab-btn {
        background: none;
        border: none;
        padding: 16px 24px;
        color: #94a3b8;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        border-bottom: 2px solid transparent;
        transition: all 0.3s ease;
      }

      .tab-btn.active {
        color: #3b82f6;
        border-bottom-color: #3b82f6;
      }

      .tab-btn:hover:not(.active) {
        color: #e2e8f0;
      }

      .modal-content {
        flex: 1;
        overflow-y: auto;
        padding: 30px;
      }

      .summary-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .summary-card {
        padding: 24px;
        border-radius: 16px;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .summary-card.positive {
        border-color: rgba(16, 185, 129, 0.3);
      }
      .summary-card.negative {
        border-color: rgba(239, 68, 68, 0.3);
      }

      .summary-label {
        font-size: 14px;
        color: #94a3b8;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .summary-value {
        font-size: 24px;
        font-weight: 700;
        color: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .trend-icon {
        font-size: 20px;
      }

      .section-title {
        font-size: 20px;
        font-weight: 600;
        color: #f1f5f9;
        margin-bottom: 24px;
      }

      .city-bars {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .city-bar-container {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.05);
      }

      .city-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .city-name {
        font-weight: 600;
        color: #f1f5f9;
        font-size: 16px;
      }

      .city-change {
        font-size: 14px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 6px;
      }

      .city-change.positive {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
      }
      .city-change.negative {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }

      .city-bars-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .city-bar {
        display: grid;
        grid-template-columns: 80px 1fr 120px;
        align-items: center;
        gap: 16px;
      }

      .bar-label {
        font-size: 12px;
        color: #94a3b8;
        font-weight: 500;
      }

      .bar-track {
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
      }

      .bar-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .bar-fill.current {
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
      }

      .bar-fill.previous {
        background: linear-gradient(90deg, #6b7280, #9ca3af);
      }

      .bar-value {
        font-size: 12px;
        color: #e2e8f0;
        text-align: right;
      }

      .table-container {
        overflow-x: auto;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .data-table {
        width: 100%;
        border-collapse: collapse;
      }

      .data-table th {
        background: rgba(255, 255, 255, 0.05);
        padding: 16px;
        text-align: left;
        font-weight: 600;
        color: #f1f5f9;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 14px;
      }

      .data-table td {
        padding: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        color: #e2e8f0;
        font-size: 14px;
      }

      .data-table tr:hover {
        background: rgba(255, 255, 255, 0.03);
      }

      .positive {
        color: #10b981;
      }
      .negative {
        color: #ef4444;
      }

      @media (max-width: 768px) {
        .modal-container {
          margin: 10px;
          max-height: 95vh;
        }

        .modal-header {
          padding: 20px;
        }

        .modal-content {
          padding: 20px;
        }

        .summary-cards {
          grid-template-columns: 1fr;
        }

        .city-bar {
          grid-template-columns: 60px 1fr 100px;
          gap: 12px;
        }
      }
    `,
  ],
})
export class DrillDownModalComponent implements OnInit {
  @Input() data: DrillDownData | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  activeTab = 'comparison';

  ngOnInit() {
    // Set up any initialization logic
  }

  onClose() {
    this.close.emit();
  }

  getTrendClass(trend: number): string {
    return trend > 0 ? 'positive' : trend < 0 ? 'negative' : '';
  }

  getTrendValue(trend: number | null | undefined): string {
    return Math.abs(trend || 0).toFixed(1);
  }

  getTrendIcon(trend: number): string {
    return trend > 0 ? '↗' : trend < 0 ? '↘' : '→';
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: value >= 10000000 ? 'compact' : 'standard',
    }).format(value);
  }

  getMaxValue(): number {
    if (!this.data?.cityData) return 0;
    return Math.max(
      ...this.data.cityData.map((city) => Math.max(city.current, city.previous))
    );
  }

  getBarWidth(value: number, maxValue: number): number {
    return maxValue > 0 ? (value / maxValue) * 100 : 0;
  }

  getTableHeaders(): string[] {
    if (!this.data?.tableData || this.data.tableData.length === 0) return [];
    return Object.keys(this.data.tableData[0]);
  }

  formatHeader(key: string): string {
    return (
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
    );
  }

  formatTableValue(value: any, key: string): string {
    if (typeof value === 'number') {
      if (
        key.toLowerCase().includes('amount') ||
        key.toLowerCase().includes('revenue') ||
        key.toLowerCase().includes('cash') ||
        key.toLowerCase().includes('card') ||
        key.toLowerCase().includes('digital')
      ) {
        return this.formatCurrency(value);
      }
      return value.toLocaleString();
    }
    return value?.toString() || '-';
  }

  trackByFn(index: number, item: any): any {
    return item.city || index;
  }
}
