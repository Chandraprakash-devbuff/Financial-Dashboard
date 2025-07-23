export interface PaymentReport {
  Patient_Type: string;
  Total: number;
  Madurai: number;
  Tirunelveli: number;
  Coimbatore: number;
  Pondy: number;
  Salem: number;
  Chennai: number;
  Tirupathi: number;
  Thanjavur: number;
  Theni: number;
  Dindigul: number;
  Tuticorin: number;
  CBE_CITY: number;
  Tiruppur: number;
  Udumalpet: number;
  Kovilpatti: number;
}

export interface CardReport {
  Patient_Type: string;
  Total: number;
  [key: string]: number | string;
}

export interface PercentReport {
  Patient_Type: string;
  Total: string;
  [key: string]: string;
}

export interface DashboardData {
  reportRunDate: string;
  paymentReports: {
    reportType: string;
    data: PaymentReport[];
  };
  cardReports: {
    reportType: string;
    data: CardReport[];
  };
  paymentPercentReports: {
    reportType: string;
    data: PercentReport[];
  };
  paymentBaseHospitalReports: {
    reportType: string;
    data: PercentReport[];
  };
}

export interface KPIData {
  title: string;
  value: number;
  trend: number;
  period: string;
  format: string;
  suffix?: string;
  trendColor: string;
  drillDownData?: any[];
  cityBreakdown?: { [key: string]: number };
}

export interface DrillDownData {
  kpiTitle: string;
  currentValue: number;
  previousValue: number;
  trend: number;
  cityData: { city: string; current: number; previous: number; change: number }[];
  tableData: any[];
}