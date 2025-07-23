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
              <th *ngFor="let column of columns">{{column.label}}</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of data">
              <td *ngFor="let column of columns">
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

    .table-title {
      margin: 0 0 20px 0;
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
    }

    .table-container {
      overflow-x: auto;
      border-radius: 12px;
      border: 1px solid rgba(148, 163, 184, 0.2);
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th {
      background: rgba(148, 163, 184, 0.1);
      padding: 16px 12px;
      text-align: left;
      font-weight: 700;
      color: #1e293b;
      font-size: 12px;
      text-transform: uppercase;
    }

    .data-table td {
      padding: 16px 12px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      color: #374151;
      font-weight: 500;
    }

    .data-table tr:hover {
      background: rgba(59, 130, 246, 0.05);
    }
  `]
})
export class DataTableComponent {
  @Input() title!: string;
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  getFormattedValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '-';
    
    if (typeof value === 'string') return value;
    if (typeof value !== 'number') return value.toString();

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          notation: value >= 10000000 ? 'compact' : 'standard'
        }).format(value);
      default:
        return value.toLocaleString('en-IN');
    }
  }
}