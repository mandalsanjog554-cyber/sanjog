
import { Employee, Project, ExpiryStatus, Invoice, BankTransaction, CommunicationLog } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'm1',
    name: 'Sami Al-Otaibi',
    role: 'General Manager (Mudhir)',
    department: 'Management & Office',
    description: 'Poori company ka faisla lena.',
    employeeId: 'MK-M001',
    iqamaExpiry: '2026-01-01',
    passportExpiry: '2027-01-01',
    medicalExpiry: '2025-01-01',
    weldingCertExpiry: 'N/A',
    status: ExpiryStatus.VALID,
    attendedDays: 26,
    absentDays: 0,
    isPaid: true,
    pendingSalaryDays: 0,
    dailyRate: 1500,
    overtimeHours: 0,
    gosiCompliant: true,
    phone: '+966 50 123 4567'
  },
  {
    id: 'e1',
    name: 'Ibrahim Khalil',
    role: 'Project Manager',
    department: 'Construction & Engineering',
    description: 'Site ka poora zimma.',
    employeeId: 'MK-E101',
    iqamaExpiry: '2025-08-20',
    passportExpiry: '2026-09-12',
    medicalExpiry: '2024-10-05',
    weldingCertExpiry: 'N/A',
    status: ExpiryStatus.VALID,
    attendedDays: 25,
    absentDays: 1,
    isPaid: true,
    pendingSalaryDays: 0,
    dailyRate: 1200,
    overtimeHours: 12,
    gosiCompliant: true,
    phone: '+966 55 987 6543'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'P1',
    name: 'RTIP Package 4',
    client: 'Saudi Aramco',
    location: 'Ras Tanura',
    totalInchDia: 45000,
    currentInchDia: 28500,
    budgetSAR: 12000000,
    actualCostSAR: 8400000,
    plannedManHours: 50000,
    actualManHours: 48000,
    startDate: '2024-01-01',
    endDate: '2024-12-30',
    manpower: 120
  },
  {
    id: 'P2',
    name: 'Yanpet Expansion',
    client: 'SABIC',
    location: 'Yanbu',
    totalInchDia: 12000,
    currentInchDia: 11200,
    budgetSAR: 4500000,
    actualCostSAR: 4850000,
    plannedManHours: 15000,
    actualManHours: 18500,
    startDate: '2023-06-15',
    endDate: '2024-05-15',
    manpower: 45
  }
];

export const MOCK_BANK_TXNS: BankTransaction[] = [
  { 
    id: 'TX-1', 
    date: '2024-03-26', 
    description: 'TRANSFER FROM SAUDI ARAMCO', 
    amount: 450000.00, 
    type: 'Credit', 
    matched: true,
    projectId: 'P1',
    category: 'Project Revenue',
    zatcaStatus: 'Reported'
  },
  { 
    id: 'TX-2', 
    date: '2024-03-25', 
    description: 'INDUSTRIAL GASES LTD PMT', 
    amount: 14375.58, 
    type: 'Debit', 
    matched: false,
    projectId: 'P1',
    category: 'Vendor Payment',
    nextAction: 'Match to Invoice INV-001'
  }
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'INV-001',
    vendor: 'Industrial Gases Ltd',
    vendorPhone: '+966 13 888 7766',
    date: '2024-03-20',
    amount: 12500,
    tax: 1875.58,
    status: 'Paid',
    category: 'Consumables',
    projectId: 'P1',
    isZatcaCompliant: true,
    lineItems: [{ desc: 'Argon Gas Cylinders', qty: 50, rate: 250, total: 12500 }]
  },
  {
    id: 'INV-002',
    vendor: 'Modern Steel Co.',
    vendorPhone: '+966 13 999 0011',
    date: '2024-03-25',
    amount: 85000,
    tax: 12750,
    status: 'Pending',
    category: 'Raw Materials',
    projectId: 'P2',
    isZatcaCompliant: true,
    lineItems: [{ desc: 'Stainless Steel Pipes 4"', qty: 100, rate: 850, total: 85000 }]
  }
];

export const MOCK_COMM_LOGS: CommunicationLog[] = [
  {
    id: 'CL-1',
    type: 'Call',
    recipient: 'Modern Steel Co.',
    timestamp: '2024-03-28 10:30 AM',
    duration: '4m 12s',
    summary: 'Confirmed delivery of stainless steel for P2. Promised to settle INV-002 by next Monday.',
    linkedId: 'INV-002'
  },
  {
    id: 'CL-2',
    type: 'WhatsApp',
    recipient: 'Ibrahim Khalil (PM)',
    timestamp: '2024-03-28 02:15 PM',
    summary: 'Sent budget alert for Yanpet Expansion. PM acknowledged overrun.',
    linkedId: 'P2'
  }
];
