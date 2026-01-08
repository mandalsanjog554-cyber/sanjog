
import React, { useState, useMemo } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  Filter, 
  DollarSign, 
  Calendar,
  AlertCircle,
  Briefcase,
  Building2,
  Warehouse,
  Info
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { Modal } from '../components/Modal';
import { Employee, Department } from '../types';

export const Workforce: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDept, setActiveDept] = useState<Department | 'All'>('All');

  const filteredWorkers = useMemo(() => {
    return MOCK_EMPLOYEES.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = activeDept === 'All' || emp.department === activeDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, activeDept]);

  const stats = useMemo(() => {
    const total = MOCK_EMPLOYEES.length;
    const present = MOCK_EMPLOYEES.reduce((acc, curr) => acc + (curr.attendedDays > 0 ? 1 : 0), 0); // Simulated
    const pendingAmount = MOCK_EMPLOYEES.reduce((acc, curr) => acc + (curr.pendingSalaryDays * curr.dailyRate), 0);
    return { total, present, pendingAmount };
  }, []);

  const departmentTabs: { id: Department | 'All', label: string, icon: any }[] = [
    { id: 'All', label: 'All Staff', icon: Users },
    { id: 'Management & Office', label: 'Office (Maktab)', icon: Briefcase },
    { id: 'Construction & Engineering', label: 'Site (Construction)', icon: Building2 },
    { id: 'Supply Chain & Warehouse', label: 'Warehouse (Logistics)', icon: Warehouse },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Workforce Management</h1>
          <p className="text-slate-500">Categorized tracking for Management, Construction, and Logistics</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 font-bold transition-all text-sm shadow-sm">
            Monthly Report
          </button>
          <button className="bg-makana-navy text-white px-4 py-2 rounded-lg hover:bg-slate-800 font-bold transition-all text-sm shadow-md">
            Bulk Payment release
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm group hover:border-makana-orange transition-all cursor-pointer">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Group Manpower</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-slate-900">{stats.total}</h3>
            <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-makana-navy group-hover:text-white transition-colors">
              <Users size={20} />
            </div>
          </div>
        </div>
        <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Daily Site Presence</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-emerald-700">98%</h3>
            <CheckCircle2 size={24} className="text-emerald-500" />
          </div>
        </div>
        <div className="bg-red-50 p-5 rounded-3xl border border-red-100">
          <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">Absence Alerts</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-red-700">2%</h3>
            <XCircle size={24} className="text-red-500" />
          </div>
        </div>
        <div className="bg-makana-navy p-5 rounded-3xl border border-slate-800 text-white shadow-xl">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Payroll Liabilities</p>
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black">{stats.pendingAmount.toLocaleString()} <span className="text-xs font-normal">SAR</span></h3>
            <DollarSign size={24} className="text-makana-orange" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-white rounded-2xl border border-slate-100 shadow-sm w-fit">
        {departmentTabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button 
              key={tab.id}
              onClick={() => setActiveDept(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeDept === tab.id ? 'bg-makana-navy text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Quick search by name or MK-ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-makana-orange transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Workers List Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
              <tr>
                <th className="px-6 py-6">Worker Name</th>
                <th className="px-6 py-6">Role & Department</th>
                <th className="px-6 py-6 text-center">Attended (MTD)</th>
                <th className="px-6 py-6 text-center">Absent</th>
                <th className="px-6 py-6">Payment Status</th>
                <th className="px-6 py-6 text-right">Liability (Days)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredWorkers.map((worker) => (
                <tr 
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className="hover:bg-slate-50/80 transition-all cursor-pointer group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-makana-navy/5 text-makana-navy flex items-center justify-center font-bold text-xs group-hover:bg-makana-navy group-hover:text-white transition-all">
                        {worker.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm group-hover:text-makana-orange block">{worker.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{worker.employeeId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-700">{worker.role}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{worker.department}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl">
                      {worker.attendedDays}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-sm font-black px-3 py-1 rounded-xl ${worker.absentDays > 0 ? 'text-red-600 bg-red-50' : 'text-slate-300 bg-slate-50'}`}>
                      {worker.absentDays}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {worker.isPaid ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">
                        <CheckCircle2 size={14} /> Fully Paid
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded-lg">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className={`text-sm font-black ${worker.pendingSalaryDays > 0 ? 'text-makana-orange' : 'text-slate-300'}`}>
                      {worker.pendingSalaryDays} Days
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredWorkers.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
               <Search size={32} />
            </div>
            <p className="text-slate-500 font-medium">No personnel matches your current filter.</p>
          </div>
        )}
      </div>

      {/* Detailed Modal */}
      <Modal 
        isOpen={!!selectedWorker} 
        onClose={() => setSelectedWorker(null)} 
        title={`Workforce Dossier: ${selectedWorker?.name}`}
      >
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-makana-navy rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                   {selectedWorker?.name[0]}
                </div>
                <div>
                   <p className="text-[10px] font-black text-makana-orange uppercase tracking-[0.2em]">{selectedWorker?.department}</p>
                   <h3 className="text-xl font-black text-slate-900">{selectedWorker?.name}</h3>
                   <p className="text-xs text-slate-500">{selectedWorker?.role} • {selectedWorker?.employeeId}</p>
                </div>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-3">
                <Info size={16} className="text-makana-orange shrink-0 mt-0.5" />
                <p className="text-xs text-slate-600 leading-relaxed italic">
                   {selectedWorker?.description || "Role responsibilities include maintaining industrial standards per Makana SOP."}
                </p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Daily Wage Structure</p>
              <p className="text-xl font-black text-slate-900">{selectedWorker?.dailyRate} <span className="text-xs font-medium">SAR</span></p>
            </div>
            <div className="bg-makana-navy p-4 rounded-2xl text-white shadow-lg">
              <p className="text-[10px] font-bold text-slate-300 uppercase mb-1">Earned to Date (MTD)</p>
              <p className="text-xl font-black">{(selectedWorker?.attendedDays || 0) * (selectedWorker?.dailyRate || 0)} <span className="text-xs font-normal">SAR</span></p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Attendance Summary (Last 30 Days)</h4>
            <div className="flex gap-4">
              <div className="flex-1 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-emerald-500" />
                   <span className="text-xs font-bold text-emerald-700">Present</span>
                 </div>
                 <span className="font-black text-emerald-700 text-lg">{selectedWorker?.attendedDays}</span>
              </div>
              <div className="flex-1 bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <XCircle size={16} className="text-red-500" />
                   <span className="text-xs font-bold text-red-700">Absent</span>
                 </div>
                 <span className="font-black text-red-700 text-lg">{selectedWorker?.absentDays}</span>
              </div>
            </div>
          </div>

          {/* Pending Salary Section */}
          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 relative overflow-hidden">
             <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3">
                  <AlertCircle size={24} className="text-amber-500" />
                  <h4 className="font-bold text-amber-900">Payroll Liability Details</h4>
                </div>
                <div className="space-y-2 border-t border-amber-200 pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-amber-800 font-medium">Outstanding Balance</span>
                    <span className="font-black text-amber-900">{(selectedWorker?.pendingSalaryDays || 0) * (selectedWorker?.dailyRate || 0)} SAR</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-amber-800 font-medium">Unpaid Working Days</span>
                    <span className="font-black text-amber-900">{selectedWorker?.pendingSalaryDays} Days</span>
                  </div>
                </div>
                <button className="w-full bg-amber-600 text-white py-3.5 rounded-2xl font-bold text-xs hover:bg-amber-700 transition-all shadow-md mt-2 flex items-center justify-center gap-2">
                  Verify & Process Salary <DollarSign size={14} />
                </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 opacity-20 rounded-full -mr-16 -mt-16"></div>
          </div>

          <div className="space-y-3">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Presence Logs</h4>
             {[
               { date: '28 March 2024', status: 'Present', site: selectedWorker?.department === 'Management & Office' ? 'HQ Jubail Office' : 'Ras Tanura HUB' },
               { date: '27 March 2024', status: 'Present', site: selectedWorker?.department === 'Management & Office' ? 'HQ Jubail Office' : 'Jubail Site 4' },
               { date: '26 March 2024', status: 'Absent', site: '-' },
             ].map((log, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-slate-50 rounded-lg">
                      <Calendar size={16} className="text-slate-400" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-800">{log.date}</p>
                     <p className="text-[10px] text-slate-400">{log.site}</p>
                   </div>
                 </div>
                 <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${log.status === 'Present' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                   {log.status}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
