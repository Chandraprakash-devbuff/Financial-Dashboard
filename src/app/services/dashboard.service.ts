import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private sampleData = {
    "reportRunDate": "20-06-2025",
    "paymentReports": {
      "reportType": "Payment Mode (Paying & Free)",
      "data": [
        {
          "Patient_Type": "Grand Total (Paying, Free, CC, VCs)",
          "Total": 313435770,
          "Madurai": 66397380,
          "Tirunelveli": 39472750,
          "Coimbatore": 41813620,
          "Pondy": 33583800,
          "Salem": 12191000,
          "Chennai": 58890970,
          "Tirupathi": 28001540,
          "Thanjavur": 702600,
          "Theni": 7144780,
          "Dindigul": 7687050,
          "Tuticorin": 3773050,
          "CBE_CITY": 2084000,
          "Tiruppur": 3846830,
          "Udumalpet": 5677800,
          "Kovilpatti": 2168600
        },
        {
          "Patient_Type": "Consulting Fees",
          "Total": 8120200,
          "Madurai": 1876100,
          "Tirunelveli": 868400,
          "Coimbatore": 987600,
          "Pondy": 810600,
          "Salem": 386700,
          "Chennai": 1175000,
          "Tirupathi": 500500,
          "Thanjavur": 227000,
          "Theni": 308300,
          "Dindigul": 265800,
          "Tuticorin": 154000,
          "CBE_CITY": 149200,
          "Tiruppur": 180200,
          "Udumalpet": 133000,
          "Kovilpatti": 97800
        },
        {
          "Patient_Type": "Surgical/Lasers",
          "Total": 255821070,
          "Madurai": 57425450,
          "Tirunelveli": 28911550,
          "Coimbatore": 23260310,
          "Pondy": 31576270,
          "Salem": 12337000,
          "Chennai": 49771450,
          "Tirupathi": 22636340,
          "Thanjavur": 297000,
          "Theni": 7412700,
          "Dindigul": 6320900,
          "Tuticorin": 3416100,
          "CBE_CITY": 1344500,
          "Tiruppur": 3582700,
          "Udumalpet": 5518500,
          "Kovilpatti": 2010300
        }
      ]
    },
    "cardReports": {
      "reportType": "Digital Payments",
      "data": [
        {
          "Patient_Type": "Cash Collection",
          "Total": 84195850,
          "Madurai": 20353250,
          "Tirunelveli": 12415450,
          "Coimbatore": 17306680,
          "Pondy": 9278850,
          "Salem": 3059600,
          "Chennai": 9974770,
          "Tirupathi": 4188300,
          "Thanjavur": 527000,
          "Theni": 1979550,
          "Dindigul": 1952950,
          "Tuticorin": 641450,
          "CBE_CITY": 170500,
          "Tiruppur": 78800,
          "Udumalpet": 1435400,
          "Kovilpatti": 833300
        },
        {
          "Patient_Type": "Card Collections",
          "Total": 71210920,
          "Madurai": 16160100,
          "Tirunelveli": 10733220,
          "Coimbatore": 8176700,
          "Pondy": 5789300,
          "Salem": 2214500,
          "Chennai": 15040660,
          "Tirupathi": 5760800,
          "Thanjavur": 0,
          "Theni": 1994100,
          "Dindigul": 1965650,
          "Tuticorin": 1105690,
          "CBE_CITY": 211000,
          "Tiruppur": 1012700,
          "Udumalpet": 900000,
          "Kovilpatti": 146500
        },
        {
          "Patient_Type": "Other digital Collections",
          "Total": 82666210,
          "Madurai": 16025700,
          "Tirunelveli": 7362250,
          "Coimbatore": 9764550,
          "Pondy": 11683060,
          "Salem": 2569100,
          "Chennai": 17335610,
          "Tirupathi": 6018550,
          "Thanjavur": 175600,
          "Theni": 1689900,
          "Dindigul": 1837700,
          "Tuticorin": 1398290,
          "CBE_CITY": 1001500,
          "Tiruppur": 1995600,
          "Udumalpet": 2817000,
          "Kovilpatti": 991800
        },
        {
          "Patient_Type": "Corporate/Insurance",
          "Total": 74597890,
          "Madurai": 13607230,
          "Tirunelveli": 8819630,
          "Coimbatore": 6518490,
          "Pondy": 6718390,
          "Salem": 4315000,
          "Chennai": 16492530,
          "Tirupathi": 12020390,
          "Thanjavur": 0,
          "Theni": 1402130,
          "Dindigul": 1921150,
          "Tuticorin": 627620,
          "CBE_CITY": 701000,
          "Tiruppur": 747330,
          "Udumalpet": 510000,
          "Kovilpatti": 197000
        }
      ]
    }
  };

  private cities = [
    'Madurai', 'Tirunelveli', 'Coimbatore', 'Pondy', 'Salem', 'Chennai', 
    'Tirupathi', 'Thanjavur', 'Theni', 'Dindigul', 'Tuticorin', 
    'CBE_CITY', 'Tiruppur', 'Udumalpet', 'Kovilpatti'
  ];

  // Previous period data (simulated as 85% of current for demonstration)
  private getPreviousData(currentValue: number): number {
    return Math.floor(currentValue * 0.85);
  }

  getDashboardData() {
    const grandTotal = this.sampleData.paymentReports.data[0];
    const consultingFees = this.sampleData.paymentReports.data[1];
    const surgicalLasers = this.sampleData.paymentReports.data[2];
    
    const cashCollection = this.sampleData.cardReports.data[0];
    const cardCollection = this.sampleData.cardReports.data[1];
    const digitalCollection = this.sampleData.cardReports.data[2];

    return {
      totalRevenue: grandTotal.Total,
      totalCashCollection: cashCollection.Total,
      totalCardCollection: cardCollection.Total,
      totalDigitalCollection: digitalCollection.Total,
      totalConsultingFees: consultingFees.Total,
      totalSurgicalRevenue: surgicalLasers.Total,
      
      // Simulated trends
      revenueTrend: 8.5,
      cashTrend: -2.3,
      cardTrend: 12.7,
      digitalTrend: 15.2,
      consultingTrend: 5.8,
      surgicalTrend: 9.1,
      
      // Chart data
      revenueChartData: {
        values: this.cities.map(city => (grandTotal as any)[city] || 0),
        labels: this.cities
      },
      
      paymentModeData: {
        segments: [
          { label: 'Cash', value: 35, color: '#3b82f6' },
          { label: 'Card', value: 30, color: '#10b981' },
          { label: 'Digital', value: 35, color: '#f59e0b' }
        ]
      },
      
      cityRevenueData: this.cities.map(city => ({
        city,
        revenue: (grandTotal as any)[city] || 0,
        cash: (cashCollection as any)[city] || 0,
        card: (cardCollection as any)[city] || 0,
        digital: (digitalCollection as any)[city] || 0
      }))
    };
  }

  getKPIDrilldownData(kpiType: string) {
    const dashboardData = this.getDashboardData();
    
    switch (kpiType) {
      case 'totalRevenue':
        return this.getRevenueDrilldown(dashboardData);
      case 'cashCollection':
        return this.getCashDrilldown(dashboardData);
      case 'cardCollection':
        return this.getCardDrilldown(dashboardData);
      case 'digitalCollection':
        return this.getDigitalDrilldown(dashboardData);
      case 'consultingFees':
        return this.getConsultingDrilldown(dashboardData);
      case 'surgicalRevenue':
        return this.getSurgicalDrilldown(dashboardData);
      default:
        return null;
    }
  }

  private getRevenueDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    const previousData = currentData.map((item: any) => ({
      ...item,
      revenue: this.getPreviousData(item.revenue)
    }));

    return {
      title: 'Total Revenue Analysis',
      currentTotal: data.totalRevenue,
      previousTotal: this.getPreviousData(data.totalRevenue),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => item.revenue)
        },
        previous: {
          labels: previousData.map((item: any) => item.city),
          values: previousData.map((item: any) => item.revenue)
        }
      },
      tableData: currentData.map((item: any) => ({
        city: item.city,
        current: item.revenue,
        previous: this.getPreviousData(item.revenue),
        growth: ((item.revenue - this.getPreviousData(item.revenue)) / this.getPreviousData(item.revenue) * 100).toFixed(1) + '%'
      }))
    };
  }

  private getCashDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    return {
      title: 'Cash Collection Analysis',
      currentTotal: data.totalCashCollection,
      previousTotal: this.getPreviousData(data.totalCashCollection),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => item.cash)
        },
        previous: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => this.getPreviousData(item.cash))
        }
      },
      tableData: currentData.map((item: any) => ({
        city: item.city,
        current: item.cash,
        previous: this.getPreviousData(item.cash),
        growth: ((item.cash - this.getPreviousData(item.cash)) / this.getPreviousData(item.cash) * 100).toFixed(1) + '%'
      }))
    };
  }

  private getCardDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    return {
      title: 'Card Collection Analysis',
      currentTotal: data.totalCardCollection,
      previousTotal: this.getPreviousData(data.totalCardCollection),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => item.card)
        },
        previous: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => this.getPreviousData(item.card))
        }
      },
      tableData: currentData.map((item: any) => ({
        city: item.city,
        current: item.card,
        previous: this.getPreviousData(item.card),
        growth: ((item.card - this.getPreviousData(item.card)) / this.getPreviousData(item.card) * 100).toFixed(1) + '%'
      }))
    };
  }

  private getDigitalDrilldown(data: any) {
    const currentData = data.cityRevenueData;
    return {
      title: 'Digital Collection Analysis',
      currentTotal: data.totalDigitalCollection,
      previousTotal: this.getPreviousData(data.totalDigitalCollection),
      comparisonCharts: {
        current: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => item.digital)
        },
        previous: {
          labels: currentData.map((item: any) => item.city),
          values: currentData.map((item: any) => this.getPreviousData(item.digital))
        }
      },
      tableData: currentData.map((item: any) => ({
        city: item.city,
        current: item.digital,
        previous: this.getPreviousData(item.digital),
        growth: ((item.digital - this.getPreviousData(item.digital)) / this.getPreviousData(item.digital) * 100).toFixed(1) + '%'
      }))
    };
  }

  private getConsultingDrilldown(data: any) {
    const consultingData = this.cities.map(city => ({
      city,
      current: (this.sampleData.paymentReports.data[1] as any)[city] || 0
    }));

    return {
      title: 'Consulting Fees Analysis',
      currentTotal: data.totalConsultingFees,
      previousTotal: this.getPreviousData(data.totalConsultingFees),
      comparisonCharts: {
        current: {
          labels: consultingData.map(item => item.city),
          values: consultingData.map(item => item.current)
        },
        previous: {
          labels: consultingData.map(item => item.city),
          values: consultingData.map(item => this.getPreviousData(item.current))
        }
      },
      tableData: consultingData.map(item => ({
        city: item.city,
        current: item.current,
        previous: this.getPreviousData(item.current),
        growth: ((item.current - this.getPreviousData(item.current)) / this.getPreviousData(item.current) * 100).toFixed(1) + '%'
      }))
    };
  }

  private getSurgicalDrilldown(data: any) {
    const surgicalData = this.cities.map(city => ({
      city,
      current: (this.sampleData.paymentReports.data[2] as any)[city] || 0
    }));

    return {
      title: 'Surgical Revenue Analysis',
      currentTotal: data.totalSurgicalRevenue,
      previousTotal: this.getPreviousData(data.totalSurgicalRevenue),
      comparisonCharts: {
        current: {
          labels: surgicalData.map(item => item.city),
          values: surgicalData.map(item => item.current)
        },
        previous: {
          labels: surgicalData.map(item => item.city),
          values: surgicalData.map(item => this.getPreviousData(item.current))
        }
      },
      tableData: surgicalData.map(item => ({
        city: item.city,
        current: item.current,
        previous: this.getPreviousData(item.current),
        growth: ((item.current - this.getPreviousData(item.current)) / this.getPreviousData(item.current) * 100).toFixed(1) + '%'
      }))
    };
  }
}