import { Component, Input, OnInit, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-wrapper">
      <div class="chart-header">
        <h3>{{title}}</h3>
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

    .chart-header {
      margin-bottom: 20px;
    }

    .chart-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .chart-container {
      position: relative;
      width: 100%;
      height: 300px;
    }

    canvas {
      max-width: 100%;
      height: auto !important;
    }
  `]
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  @Input() title!: string;
  @Input() data: any;
  @Input() type: ChartType = 'line';
  @Input() height = 300;
  @Input() width = 600;

  private chart: Chart | null = null;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes['data'] || changes['type'])) {
      this.updateChart();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config = this.getChartConfig();
    this.chart = new Chart(ctx, config);
  }

  private updateChart() {
    if (!this.chart) return;

    const config = this.getChartConfig();
    this.chart.data = config.data!;
    this.chart.options = config.options!;
    this.chart.update();
  }

  private getChartConfig(): ChartConfiguration {
    if (this.type === 'line') {
      return this.getLineChartConfig();
    } else if (this.type === 'doughnut') {
      return this.getDoughnutChartConfig();
    }
    return this.getLineChartConfig();
  }

  private getLineChartConfig(): ChartConfiguration {
    const values = this.data?.values || [100, 150, 120, 180, 160, 200, 175, 220];
    const labels = values.map((_: any, index: number) => `Day ${index + 1}`);

    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Revenue',
            data: values,
            borderColor: '#3498db',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3498db',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                family: 'Arial, sans-serif'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#3498db',
            borderWidth: 1,
            cornerRadius: 6,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              },
              color: '#7f8c8d'
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              font: {
                size: 11
              },
              color: '#7f8c8d',
              callback: function(value: any) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        elements: {
          point: {
            hoverBackgroundColor: '#3498db'
          }
        }
      }
    };
  }

  private getDoughnutChartConfig(): ChartConfiguration {
    const segments = this.data?.segments || [
      { label: 'Cash', value: 45, color: '#3498db' },
      { label: 'Credit Card', value: 30, color: '#2ecc71' },
      { label: 'Insurance', value: 20, color: '#f39c12' },
      { label: 'Other', value: 5, color: '#e74c3c' }
    ];

    return {
      type: 'doughnut',
      data: {
        labels: segments.map((s: any) => s.label),
        datasets: [
          {
            data: segments.map((s: any) => s.value),
            backgroundColor: segments.map((s: any) => s.color),
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 12,
                family: 'Arial, sans-serif'
              },
              generateLabels: (chart) => {
                const data = chart.data;
                if (data.labels && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const dataset = data.datasets[0];
                    const value = dataset.data[i] as number;
                    return {
                      text: `${label}: ${value}%`,
                      fillStyle: (dataset.backgroundColor as string[])[i] as string,
                      strokeStyle: dataset.borderColor as string,
                      lineWidth: dataset.borderWidth as number,
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#3498db',
            borderWidth: 1,
            cornerRadius: 6,
            callbacks: {
              label: function(context: any) {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        },
        cutout: '60%',
        elements: {
          arc: {
            borderWidth: 2
          }
        }
      } as any
    };
  }
}