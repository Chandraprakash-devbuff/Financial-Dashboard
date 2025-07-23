import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        <canvas #chartCanvas [width]="width" [height]="height"></canvas>
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
    }

    canvas {
      max-width: 100%;
      height: auto;
    }
  `]
})
export class ChartComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() title!: string;
  @Input() data: any;
  @Input() type = 'line';
  @Input() height = 300;
  @Input() width = 600;

  ngOnInit() {
    this.renderChart();
  }

  private renderChart() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.drawSimpleChart(ctx);
  }

  private drawSimpleChart(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (this.type === 'line') {
      this.drawLineChart(ctx);
    } else if (this.type === 'doughnut') {
      this.drawDoughnutChart(ctx);
    }
  }

  private drawLineChart(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const padding = 40;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;

    // Sample data for line chart
    const points = this.data?.values || [100, 150, 120, 180, 160, 200, 175, 220];
    const maxValue = Math.max(...points);
    const minValue = Math.min(...points);
    const range = maxValue - minValue;

    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 3;

    ctx.beginPath();
    points.forEach((point:number, index:number) => {
      const x = padding + (index / (points.length - 1)) * width;
      const y = padding + height - ((point - minValue) / range) * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#3498db';
    points.forEach((point:number, index:number) => {
      const x = padding + (index / (points.length - 1)) * width;
      const y = padding + height - ((point - minValue) / range) * height;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }

  private drawDoughnutChart(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    const innerRadius = radius * 0.6;

    // Sample data for doughnut chart
    const data = this.data?.segments || [
      { label: 'Cash', value: 45, color: '#3498db' },
      { label: 'Credit Card', value: 30, color: '#2ecc71' },
      { label: 'Check', value: 15, color: '#f39c12' },
      { label: 'Other', value: 10, color: '#e74c3c' }
    ];

    const total = data.reduce((sum: number, item: any) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2; // Start from top

    data.forEach((segment: any) => {
      const sliceAngle = (segment.value / total) * 2 * Math.PI;

      ctx.fillStyle = segment.color;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fill();

      currentAngle += sliceAngle;
    });

    // Center circle
    ctx.fillStyle = '#f8f9fa';
    ctx.beginPath();
    ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
    ctx.fill();
  }
}