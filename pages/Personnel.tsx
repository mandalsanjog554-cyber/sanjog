
import React, { useState } from 'react';
import { Search, Filter, AlertCircle, CheckCircle, Clock, FileText, Download, ShieldCheck } from 'lucide-react';
import { MOCK_EMPLOYEES } from '../constants';
import { ExpiryStatus } from '../types';
import { Modal } from '../components/Modal';

export const Personnel: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const getStatusStyle = (status: ExpiryStatus) => {
    switch (status) {
      case ExpiryStatus.VALID:
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: <CheckCircle size={14} className="mr-1" />, label: 'Green - OK' };
      case ExpiryStatus.WARNING:
        return { bg: 'bg-amber-50', text: 'text-amber-700', icon: <Clock size={14} className="mr-1" />, label: 'Yellow - Pending' };
      case ExpiryStatus.EXPIRED:
        return { bg: 'bg-red-50', text: 'text-red-700', icon: <AlertCircle size={14} className="mr-1" />, label: 'Red - Blocked' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Personnel Compliance</h1>
          <p className="text-slate-500">Managing 512 active employees and contractors</p>
        </div>
        <button className="bg-makana-navy text-white px-6 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-md">
          Add New Employee
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by name, ID, or welding ticket..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-makana-orange outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-all">
          <Filter size={20} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_EMPLOYEES.map(emp => {
          const style = getStatusStyle(emp.status);
          return (
            <div 
              key={emp.id} 
              onClick={() => setSelectedEmployee(emp)}
              className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-lg hover:border-makana-orange transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:bg-makana-navy group-hover:text-white transition-colors">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center ${style.bg} ${style.text}`}>
                  {style.icon} {style.label}
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-1">{emp.name}</h3>
              <p className="text-sm text-slate-500 mb-4">{emp.role} • {emp.employeeId}</p>

              <div className="space-y-3 pt-4 border-t border-slate-50">
                {[
                  { label: 'Iqama', expiry: emp.iqamaExpiry },
                  { label: 'Passport', expiry: emp.passportExpiry },
                  { label: 'Medical', expiry: emp.medicalExpiry },
                  { label: 'Welding Ticket', expiry: emp.weldingCertExpiry },
                ].map(doc => (
                  <div key={doc.label} className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">{doc.label}</span>
                    <span className={`font-bold ${new Date(doc.expiry) < new Date() ? 'text-red-500' : 'text-slate-700'}`}>
                      {doc.expiry}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] font-bold text-makana-orange mt-6 text-center opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">View Detailed Dossier</p>
            </div>
          );
        })}
      </div>

      <Modal 
        isOpen={!!selectedEmployee} 
        onClose={() => setSelectedEmployee(null)} 
        title={`Employee Dossier: ${selectedEmployee?.name}`}
      >
        <div className="space-y-8">
          <div className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <div className="w-20 h-20 bg-makana-navy rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {selectedEmployee?.name?.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs font-bold text-makana-orange uppercase tracking-widest">{selectedEmployee?.role}</p>
              <h4 className="text-2xl font-bold text-slate-900">{selectedEmployee?.name}</h4>
              <p className="text-sm text-slate-500">ID: {selectedEmployee?.employeeId} • Department: Fabrication</p>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-500" /> Site Access Certification
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Iqama / Residency', id: 'DOC-992-01', status: 'Valid', color: 'emerald' },
                { title: 'Welding Ticket (TIG)', id: 'W-PROC-12', status: 'Warning', color: 'amber' },
                { title: 'Aramco Site Induction', id: 'RT-2024-IND', status: 'Valid', color: 'emerald' },
                { title: 'H2S Gas Safety Cert', id: 'H2S-331', status: 'Expired', color: 'red' },
              ].map((doc, i) => (
                <div key={i} className={`p-4 rounded-2xl border bg-white flex flex-col justify-between ${doc.status === 'Valid' ? 'border-emerald-100' : doc.status === 'Warning' ? 'border-amber-100' : 'border-red-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-800">{doc.title}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-${doc.color}-50 text-${doc.color}-600`}>{doc.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mb-3">{doc.id}</p>
                  <button className="text-[10px] font-bold text-makana-navy flex items-center gap-1 hover:underline">
                    <Download size={12} /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-makana-navy text-white p-6 rounded-3xl relative overflow-hidden">
             <div className="relative z-10 flex items-center justify-between">
               <div>
                 <p className="text-xs text-slate-400 font-bold uppercase mb-1">Upcoming Renewal Cost</p>
                 <p className="text-2xl font-black">1,250 SAR</p>
               </div>
               <button className="bg-makana-orange text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-600 transition-all">
                 Initiate Renewal
               </button>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
