import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <div class="chart-header">
        <h3>{{ title }}</h3>
      </div>
      <div class="chart-container">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      padding: 20px;
    }

    .chart-header h3 {
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .chart-container {
      position: relative;
      width: 100%;
      height: 300px;
    }
  `]
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() title!: string;
  @Input() data: any;
  @Input() type: 'line' | 'doughnut' = 'line';

  private chart: Chart | null = null;

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = this.getChartConfig();
    this.chart = new Chart(ctx, config);
  }

  private getChartConfig(): ChartConfiguration {
    if (this.type === 'doughnut') {
      return this.getDoughnutConfig();
    }
    return this.getLineConfig();
  }

  private getLineConfig(): ChartConfiguration {
    const values = this.data?.values || [];
    const labels = this.data?.labels || [];

    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: values,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '₹' + value.toLocaleString();
              }
            }
          }
        }
      }
    };
  }

  private getDoughnutConfig(): ChartConfiguration {
    const segments = this.data?.segments || [];

    return {
      type: 'doughnut',
      data: {
        labels: segments.map((s: any) => s.label),
        datasets: [{
          data: segments.map((s: any) => s.value),
          backgroundColor: segments.map((s: any) => s.color),
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    };
  }
}