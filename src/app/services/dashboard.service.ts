import { Injectable } from '@angular/core';
import { DashboardData, KPIData, DrillDownData } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private sampleData: DashboardData = {
    "reportRunDate": "20-06-2025",
    "paymentReports": {
      "reportType": "Payment Mode (Paying & Free)\nExcluding VC & CC Revenue",
      "data": [
        {
          "Patient_Type": "Grand Total (Paying, Free, CC, VCs)",
          "Total": 31343577,
          "Madurai": 6639738,
          "Tirunelveli": 3947275,
          "Coimbatore": 4181362,
          "Pondy": 3358380,
          "Salem": 1219100,
          "Chennai": 5889097,
          "Tirupathi": 2800154,
          "Thanjavur": 70260,
          "Theni": 714478,
          "Dindigul": 768705,
          "Tuticorin": 377305,
          "CBE_CITY": 208400,
          "Tiruppur": 384683,
          "Udumalpet": 567780,
          "Kovilpatti": 216860
        },
        {
          "Patient_Type": "Consulting Fees",
          "Total": 812020,
          "Madurai": 187610,
          "Tirunelveli": 86840,
          "Coimbatore": 98760,
          "Pondy": 81060,
          "Salem": 38670,
          "Chennai": 117500,
          "Tirupathi": 50050,
          "Thanjavur": 22700,
          "Theni": 30830,
          "Dindigul": 26580,
          "Tuticorin": 15400,
          "CBE_CITY": 14920,
          "Tiruppur": 18020,
          "Udumalpet": 13300,
          "Kovilpatti": 9780
        },
        {
          "Patient_Type": "Surgical/Lasers",
          "Total": 25582107,
          "Madurai": 5742545,
          "Tirunelveli": 2891155,
          "Coimbatore": 2326031,
          "Pondy": 3157627,
          "Salem": 1233700,
          "Chennai": 4977145,
          "Tirupathi": 2263634,
          "Thanjavur": 29700,
          "Theni": 741270,
          "Dindigul": 632090,
          "Tuticorin": 341610,
          "CBE_CITY": 134450,
          "Tiruppur": 358270,
          "Udumalpet": 551850,
          "Kovilpatti": 201030
        }
      ]
    },
    "cardReports": {
      "reportType": "Digital Payments",
      "data": [
        {
          "Patient_Type": "Cash Collection",
          "Total": 8419585,
          "Madurai": 2035325,
          "Tirunelveli": 1241545,
          "Coimbatore": 1730668,
          "Pondy": 927885,
          "Salem": 305960,
          "Chennai": 997477,
          "Tirupathi": 418830,
          "Thanjavur": 52700,
          "Theni": 197955,
          "Dindigul": 195295,
          "Tuticorin": 64145,
          "CBE_CITY": 17050,
          "Tiruppur": 7880,
          "Udumalpet": 143540,
          "Kovilpatti": 83330
        },
        {
          "Patient_Type": "Card Collections",
          "Total": 7121092,
          "Madurai": 1616010,
          "Tirunelveli": 1073322,
          "Coimbatore": 817670,
          "Pondy": 578930,
          "Salem": 221450,
          "Chennai": 1504066,
          "Tirupathi": 576080,
          "Thanjavur": 0,
          "Theni": 199410,
          "Dindigul": 196565,
          "Tuticorin": 110569,
          "CBE_CITY": 21100,
          "Tiruppur": 101270,
          "Udumalpet": 90000,
          "Kovilpatti": 14650
        },
        {
          "Patient_Type": "Other digital Collections",
          "Total": 8266621,
          "Madurai": 1602570,
          "Tirunelveli": 736225,
          "Coimbatore": 976455,
          "Pondy": 1168306,
          "Salem": 256910,
          "Chennai": 1733561,
          "Tirupathi": 601855,
          "Thanjavur": 17560,
          "Theni": 168990,
          "Dindigul": 183770,
          "Tuticorin": 139829,
          "CBE_CITY": 100150,
          "Tiruppur": 199560,
          "Udumalpet": 281700,
          "Kovilpatti": 99180
        }
      ]
    },
    "paymentPercentReports": {
      "reportType": "% of All payments",
      "data": [
        {
          "Patient_Type": "Total",
          "Total": "64.63%",
          "Madurai": "61.26%",
          "Tirunelveli": "59.31%",
          "Coimbatore": "50.90%",
          "Pondy": "65.31%",
          "Salem": "60.99%",
          "Chennai": "76.44%",
          "Tirupathi": "73.77%",
          "Thanjavur": "24.99%",
          "Theni": "65.05%",
          "Dindigul": "66.08%",
          "Tuticorin": "79.60%",
          "CBE_CITY": "87.68%",
          "Tiruppur": "97.44%",
          "Udumalpet": "72.14%",
          "Kovilpatti": "57.73%"
        }
      ]
    },
    "paymentBaseHospitalReports": {
      "reportType": "Payment Mode",
      "data": [
        {
          "Patient_Type": "Cash % of Total Collections",
          "Total": "27.11%",
          "Madurai": "31.03%",
          "Tirunelveli": "31.81%",
          "Coimbatore": "41.50%",
          "Pondy": "27.97%",
          "Salem": "25.37%",
          "Chennai": "17.02%",
          "Tirupathi": "15.01%",
          "Thanjavur": "75.01%",
          "Theni": "28.81%",
          "Dindigul": "25.53%",
          "Tuticorin": "17.00%",
          "CBE_CITY": "8.18%",
          "Tiruppur": "2.37%",
          "Udumalpet": "25.55%",
          "Kovilpatti": "38.43%"
        }
      ]
    }
  };

  private cities = [
    'Madurai', 'Tirunelveli', 'Coimbatore', 'Pondy', 'Salem', 'Chennai', 
    'Tirupathi', 'Thanjavur', 'Theni', 'Dindigul', 'Tuticorin', 
    'CBE_CITY', 'Tiruppur', 'Udumalpet', 'Kovilpatti'
  ];

  getDashboardData(period: string = 'mtd') {
    const grandTotal = this.sampleData.paymentReports.data[0];
    const consultingFees = this.sampleData.paymentReports.data[1];
    const surgicalLasers = this.sampleData.paymentReports.data[2];
    
    const cashCollection = this.sampleData.cardReports.data[0];
    const cardCollection = this.sampleData.cardReports.data[1];
    const digitalCollection = this.sampleData.cardReports.data[2];

    // Calculate KPIs based on real data
    const totalRevenue = grandTotal.Total;
    const totalCashCollection = cashCollection.Total;
    const totalCardCollection = cardCollection.Total;
    const totalDigitalCollection = digitalCollection.Total;
    const totalConsultingFees = consultingFees.Total;
    const totalSurgicalRevenue = surgicalLasers.Total;

    // Calculate averages and percentages
    const avgRevenuePerPatient = Math.round(totalRevenue / 1200); // Assuming 1200 patients
    const digitalPaymentPercentage = ((totalCardCollection + totalDigitalCollection) / (totalCashCollection + totalCardCollection + totalDigitalCollection)) * 100;

    return {
      totalRevenue,
      totalCashCollection,
      totalCardCollection,
      totalDigitalCollection,
      totalConsultingFees,
      totalSurgicalRevenue,
      avgRevenuePerPatient,
      digitalPaymentPercentage,
      
      // Trends (simulated)
      revenueTrend: 8.5,
      cashTrend: -2.3,
      cardTrend: 12.7,
      digitalTrend: 15.2,
      consultingTrend: 5.8,
      surgicalTrend: 9.1,
      avgRevenueTrend: 3.2,
      digitalPercentTrend: 4.5,
      
      // Chart data
      revenueChartData: {
        values: this.cities.map(city => (grandTotal as any)[city] || 0)
      },
      
      paymentModeData: {
        segments: [
          { label: 'Cash', value: Math.round((totalCashCollection / (totalCashCollection + totalCardCollection + totalDigitalCollection)) * 100), color: '#3b82f6' },
          { label: 'Card', value: Math.round((totalCardCollection / (totalCashCollection + totalCardCollection + totalDigitalCollection)) * 100), color: '#10b981' },
          { label: 'Digital', value: Math.round((totalDigitalCollection / (totalCashCollection + totalCardCollection + totalDigitalCollection)) * 100), color: '#f59e0b' }
        ]
      },
      
      // City breakdown data
      cityRevenueData: this.cities.map(city => ({
        city,
        revenue: (grandTotal as any)[city] || 0,
        cash: (cashCollection as any)[city] || 0,
        card: (cardCollection as any)[city] || 0,
        digital: (digitalCollection as any)[city] || 0
      })),

      // Raw data for drill-down
      rawData: this.sampleData
    };
  }

  getDrillDownData(kpiType: string): DrillDownData {
    const currentData = this.getDashboardData();
    
    // Simulate previous period data (90% of current for demo)
    const previousMultiplier = 0.9;
    
    switch (kpiType) {
      case 'totalRevenue':
        return {
          kpiTitle: 'Total Revenue',
          currentValue: currentData.totalRevenue,
          previousValue: Math.round(currentData.totalRevenue * previousMultiplier),
          trend: ((currentData.totalRevenue - (currentData.totalRevenue * previousMultiplier)) / (currentData.totalRevenue * previousMultiplier)) * 100,
          cityData: currentData.cityRevenueData.map(city => ({
            city: city.city,
            current: city.revenue,
            previous: Math.round(city.revenue * previousMultiplier),
            change: ((city.revenue - (city.revenue * previousMultiplier)) / (city.revenue * previousMultiplier)) * 100
          })),
          tableData: currentData.cityRevenueData
        };
      
      case 'cashCollection':
        return {
          kpiTitle: 'Cash Collection',
          currentValue: currentData.totalCashCollection,
          previousValue: Math.round(currentData.totalCashCollection * previousMultiplier),
          trend: ((currentData.totalCashCollection - (currentData.totalCashCollection * previousMultiplier)) / (currentData.totalCashCollection * previousMultiplier)) * 100,
          cityData: currentData.cityRevenueData.map(city => ({
            city: city.city,
            current: city.cash,
            previous: Math.round(city.cash * previousMultiplier),
            change: ((city.cash - (city.cash * previousMultiplier)) / (city.cash * previousMultiplier)) * 100
          })),
          tableData: currentData.cityRevenueData.map(city => ({ city: city.city, amount: city.cash }))
        };
      
      default:
        return {
          kpiTitle: 'Unknown KPI',
          currentValue: 0,
          previousValue: 0,
          trend: 0,
          cityData: [],
          tableData: []
        };
    }
  }
}