
export enum ExpiryStatus {
  VALID = 'VALID',
  WARNING = 'WARNING',
  EXPIRED = 'EXPIRED'
}

export type Department = 'Management & Office' | 'Construction & Engineering' | 'Supply Chain & Warehouse';

export interface DPR {
  id: string;
  projectId: string;
  date: string;
  inchDiaToday: number;
  manpowerCount: number;
  notes?: string;
}

export interface CommunicationLog {
  id: string;
  type: 'Call' | 'WhatsApp' | 'Email';
  recipient: string;
  timestamp: string;
  duration?: string;
  summary: string;
  linkedId: string; // Invoice or Project ID
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: Department;
  employeeId: string;
  iqamaExpiry: string;
  passportExpiry: string;
  medicalExpiry: string;
  weldingCertExpiry: string;
  status: ExpiryStatus;
  attendedDays: number;
  absentDays: number;
  isPaid: boolean;
  pendingSalaryDays: number;
  dailyRate: number;
  overtimeHours: number;
  gosiCompliant: boolean;
  description?: string;
  phone: string;
}

export interface Project {
  id: string;
  name: string;
  client: 'Saudi Aramco' | 'SABIC' | 'Ma\'aden' | 'Other';
  location: string;
  totalInchDia: number;
  currentInchDia: number;
  budgetSAR: number;
  actualCostSAR: number;
  plannedManHours: number;
  actualManHours: number;
  startDate: string;
  endDate: string;
  manpower: number;
}

export interface BankTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Credit' | 'Debit';
  matched: boolean;
  projectId?: string;
  category?: string;
  nextAction?: string;
  zatcaStatus?: 'Reported' | 'Pending' | 'Error';
}

export interface Invoice {
  id: string;
  vendor: string;
  vendorPhone?: string;
  gstin?: string;
  date: string;
  amount: number;
  tax: number;
  status: 'Pending' | 'Paid' | 'Disputed';
  category: string;
  projectId?: string;
  isZatcaCompliant: boolean;
  qrCode?: string;
  lineItems: Array<{ desc: string; qty: number; rate: number; total: number }>;
}
