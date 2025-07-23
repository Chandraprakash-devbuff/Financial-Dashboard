import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  getDashboardData(period: string) {
    // Sample data - replace with actual API calls
    const baseData = {
      day: {
        totalRevenue: 4250,
        totalExpenses: 1625,
        avgRevenuePerPatient: 802,
        reconciliationPercentage: 94.5,
        cashOnHand: 15420,
        bankBalance: 125000,
        arDays: 32
      },
      mtd: {
        totalRevenue: 85000,
        totalExpenses: 32500,
        avgRevenuePerPatient: 850,
        reconciliationPercentage: 96.2,
        cashOnHand: 15420,
        bankBalance: 125000,
        arDays: 28
      },
      ytd: {
        totalRevenue: 950000,
        totalExpenses: 425000,
        avgRevenuePerPatient: 825,
        reconciliationPercentage: 95.8,
        cashOnHand: 15420,
        bankBalance: 125000,
        arDays: 30
      }
    };

    const currentData = baseData[period as keyof typeof baseData] || baseData.mtd;
    
    return {
      ...currentData,
      netIncome: currentData.totalRevenue - currentData.totalExpenses,
      
      // Trends (percentage changes)
      revenueTrend: 8.5,
      expensesTrend: -3.2,
      netIncomeTrend: 12.3,
      avgRevenueTrend: 2.1,
      reconciliationTrend: 1.5,
      cashTrend: -2.3,
      bankTrend: 4.7,
      arDaysTrend: -5.2,
      
      // Chart data
      revenueChartData: {
        values: period === 'day' ? [4250] : 
                period === 'mtd' ? [3200, 3800, 3500, 4200, 3900, 4500, 4100, 4250] :
                [75000, 82000, 78000, 85000, 88000, 92000, 89000, 95000, 91000, 87000, 90000, 85000]
      },
      
      paymentModeData: {
        segments: [
          { label: 'Cash', value: 45, color: '#3498db' },
          { label: 'Credit Card', value: 30, color: '#2ecc71' },
          { label: 'Insurance', value: 20, color: '#f39c12' },
          { label: 'Other', value: 5, color: '#e74c3c' }
        ]
      },
      
      // Table data
      paymentModeBreakdown: [
        { mode: 'Cash', amount: 38250, percentage: 45.0, transactions: 125 },
        { mode: 'Credit Card', amount: 25500, percentage: 30.0, transactions: 89 },
        { mode: 'Insurance', amount: 17000, percentage: 20.0, transactions: 45 },
        { mode: 'Check', amount: 3400, percentage: 4.0, transactions: 12 },
        { mode: 'Other', amount: 850, percentage: 1.0, transactions: 5 }
      ],
      
      bankAccountSummary: [
        { accountName: 'Primary Operating', accountNumber: '****1234', balance: 85000, lastUpdated: new Date() },
        { accountName: 'Payroll Account', accountNumber: '****5678', balance: 25000, lastUpdated: new Date() },
        { accountName: 'Equipment Fund', accountNumber: '****9012', balance: 15000, lastUpdated: new Date() }
      ]
    };
  }
}
