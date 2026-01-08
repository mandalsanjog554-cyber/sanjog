
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  MapPin,
  ClipboardCheck,
  ShieldCheck,
  Calendar,
  FileText
} from 'lucide-react';
import { MOCK_EMPLOYEES, MOCK_PROJECTS } from '../constants';
import { Modal } from '../components/Modal';

const StatCard = ({ title, value, icon: Icon, color, trend, onClick }: any) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-makana-orange transition-all cursor-pointer group"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="text-white" size={24} />
      </div>
      {trend && (
        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
          +{trend}%
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    <p className="text-[10px] text-makana-orange font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Click for audit log</p>
  </div>
);

export const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const complianceData = [
    { name: 'Valid', value: MOCK_EMPLOYEES.filter(e => e.status === 'VALID').length, color: '#10b981' },
    { name: 'Expiring Soon', value: MOCK_EMPLOYEES.filter(e => e.status === 'WARNING').length, color: '#f59e0b' },
    { name: 'Expired', value: MOCK_EMPLOYEES.filter(e => e.status === 'EXPIRED').length, color: '#ef4444' },
  ];

  const progressData = MOCK_PROJECTS.map(p => ({
    name: p.name,
    total: p.totalInchDia,
    current: p.currentInchDia,
    percent: Math.round((p.currentInchDia / p.totalInchDia) * 100)
  }));

  const handleRowClick = (project: any) => {
    setSelectedItem({
      type: 'project',
      title: `${project.name} - Detailed Compliance`,
      data: project
    });
  };

  const handleStatClick = (type: string) => {
    setSelectedItem({
      type: 'stat',
      title: `${type} Audit Summary`,
      statType: type
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Operational Dashboard</h1>
          <p className="text-slate-500">Overview of compliance and project performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white text-slate-700 px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 font-medium transition-colors">
            Download PDF Report
          </button>
          <button className="bg-makana-orange text-white px-4 py-2 rounded-lg hover:bg-orange-600 font-medium transition-colors shadow-sm">
            Refresh Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard onClick={() => handleStatClick('Manpower')} title="Total Employees" value="512" icon={Users} color="bg-makana-navy" />
        <StatCard onClick={() => handleStatClick('Compliance')} title="Compliance Rate" value="94.2%" icon={CheckCircle2} color="bg-emerald-500" trend="2.4" />
        <StatCard onClick={() => handleStatClick('Alerts')} title="Document Alerts" value="12" icon={AlertTriangle} color="bg-amber-500" />
        <StatCard onClick={() => handleStatClick('Production')} title="Total Inch-Dia" value="185k" icon={TrendingUp} color="bg-makana-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div 
          onClick={() => handleStatClick('Compliance Heatmap')}
          className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-1 hover:border-makana-orange cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800">Compliance Heatmap</h2>
            <AlertTriangle size={18} className="text-amber-500" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {complianceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-slate-800">Project Performance (Inch-Dia)</h2>
            <div className="flex items-center space-x-2 text-xs text-slate-400">
               <span className="w-3 h-3 bg-makana-navy rounded-full"></span> <span>Target</span>
               <span className="w-3 h-3 bg-makana-orange rounded-full ml-2"></span> <span>Actual</span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="total" fill="#0a192f" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="current" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">Active Project Map</h2>
          <p className="text-xs text-slate-400">Click a row to view client compliance documentation</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Completion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_PROJECTS.map(project => (
                <tr 
                  key={project.id} 
                  onClick={() => handleRowClick(project)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 font-semibold text-slate-900 group-hover:text-makana-orange">{project.name}</td>
                  <td className="px-6 py-4 text-slate-500 flex items-center">
                    <MapPin size={14} className="mr-1 text-slate-400" /> {project.location}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${project.client === 'Saudi Aramco' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {project.client}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-sm text-emerald-600">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span> On Track
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-makana-orange" 
                          style={{width: `${(project.currentInchDia / project.totalInchDia) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        {Math.round((project.currentInchDia / project.totalInchDia) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Modal */}
      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title={selectedItem?.title || ''}
      >
        {selectedItem?.type === 'project' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Aramco Permit Status</p>
                <p className="text-emerald-600 font-bold flex items-center gap-2">
                  <ShieldCheck size={16} /> Active & Verified
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase mb-1">Last HSE Audit</p>
                <p className="text-slate-900 font-bold flex items-center gap-2">
                  <Calendar size={16} /> 28 March 2024
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">Document Compliance Checklist</h4>
              {[
                { label: 'Work Permit #SA-2291', status: 'Approved' },
                { label: 'Welding Procedure Specification (WPS)', status: 'Approved' },
                { label: 'Procedure Qualification Record (PQR)', status: 'Approved' },
                { label: 'Site Safety Plan', status: 'Pending Review' },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                  <span className="text-sm text-slate-600 flex items-center gap-2">
                    <FileText size={16} className="text-slate-400" /> {doc.label}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${doc.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-makana-navy/5 p-4 rounded-2xl border border-makana-navy/10">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                "Audit revealed 100% adherence to Saudi Aramco G.I. standards for the last 4 DPR cycles. No non-compliance reported."
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-makana-orange/10 rounded-full flex items-center justify-center text-makana-orange mb-4">
              <ClipboardCheck size={32} />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Internal Audit Report</h4>
            <p className="text-slate-500 max-w-sm mb-6">
              Full data logs for {selectedItem?.statType} are being aggregated from Jubail and Ras Tanura hubs.
            </p>
            <div className="w-full bg-slate-50 rounded-xl p-4 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Audit ID</span>
                <span className="text-xs font-mono text-slate-600">MAK-AUDIT-2025-001</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase">Verification</span>
                <span className="text-xs font-bold text-emerald-600">Digital Signature Verified</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
