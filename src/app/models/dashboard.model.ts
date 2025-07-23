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
}

export interface KPIData {
  title: string;
  value: number;
  trend: number;
  period: string;
  format: string;
  trendColor: string;
}