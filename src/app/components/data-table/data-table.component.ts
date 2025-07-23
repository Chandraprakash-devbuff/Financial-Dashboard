import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <div class="table-header">
        <h3>{{title}}</h3>
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
      padding: 20px;
    }

    .table-header {
      margin-bottom: 20px;
    }

    .table-header h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #2c3e50;
    }

    .table-container {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .data-table th {
      background: #f8f9fa;
      padding: 12px 8px;
      text-align: left;
      font-weight: 600;
      color: #2c3e50;
      border-bottom: 2px solid #dee2e6;
    }

    .data-table td {
      padding: 12px 8px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: middle;
    }

    .data-table tr:hover {
      background: #f8f9fa;
    }

    .data-table tr:last-child td {
      border-bottom: none;
    }
  `]
})
export class DataTableComponent {
  @Input() title!: string;
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  getFormattedValue(value: any, format?: string): string {
    if (value === null || value === undefined) return '-';

    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return value.toFixed(1) + '%';
      case 'date':
        return new Date(value).toLocaleDateString();
      default:
        return value.toString();
    }
  }
}