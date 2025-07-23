import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <div class="table-header">
        <h3 class="table-title">{{title}}</h3>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th *ngFor="let column of columns" class="table-header-cell">{{column.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data" class="table-row">
              <td *ngFor="let column of columns" class="table-cell">
                {{getFormattedValue(row[column.key], column.format)}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-wrapper {
      padding: 24px;
    }

    .table-header {
      margin-bottom: 20px;
    }

    .table-title {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      border-radius: 12px;
      overflow: hidden;
    }

    .table-header-cell {
      background: rgba(148, 163, 184, 0.1);
      padding: 16px 12px;
      text-align: left;
      font-weight: 700;
      color: #1e293b;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .table-cell {
      padding: 16px 12px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      vertical-align: middle;
      color: #374151;
      font-weight: 500;
    }

    .table-row:hover {
      background: rgba(59, 130, 246, 0.05);
      transform: scale(1.01);
      transition: all 0.2s ease;
    }

    .table-row:last-child .table-cell {
      border-bottom: none;
    }

    .table-container {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(148, 163, 184, 0.1);
    }
  `]
})
export class DataTableComponent {
  @Input() title!: string;
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  getFormattedValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '-';
    
    // Handle string values that might contain percentages
    if (typeof value === 'string') {
      if (value.includes('%')) {
        return value; // Return percentage strings as-is
      }
      // Try to parse string numbers
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        value = numValue;
      } else {
        return value; // Return non-numeric strings as-is
      }
    }
    
    // Ensure value is a number for numeric formatting
    if (typeof value !== 'number') {
      return value.toString();
    }

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          notation: value >= 10000000 ? 'compact' : 'standard'
        }).format(value);
      case 'percentage':
        return value.toFixed(1) + '%';
      case 'date':
        return new Date(value).toLocaleDateString('en-IN');
      default:
        return value.toLocaleString('en-IN');
    }
  }
}