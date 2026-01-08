
import React, { useState, useMemo } from 'react';
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Globe, 
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Clock,
  Briefcase
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_EMPLOYEES } from '../constants';
import { Modal } from '../components/Modal';

export const StrategyHub: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);

  const projectAlerts = useMemo(() => {
    return MOCK_PROJECTS.filter(p => p.actualCostSAR > p.budgetSAR || p.actualManHours > p.plannedManHours);
  }, []);

  const totalLeakageSaved = "15%"; // Pitch focus

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Executive Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Target className="text-makana-orange" size={32} />
            Makana Strategy Hub
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">"Visionary Intelligence for Industrial Leadership"</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-makana-navy text-white px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl border border-white/10">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-black uppercase tracking-[0.2em]">AI Pulse: Optimized</span>
          </div>
        </div>
      </div>

      {/* Red Alert: Project Pulse Section */}
      <div className="bg-white rounded-[40px] border-4 border-slate-100 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Zap className="text-makana-orange" size={20} />
              Project Pulse (Plan vs. Actual)
            </h2>
            <p className="text-sm text-slate-400 font-medium">Real-time "Red Alert" threshold monitoring</p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">MTD Performance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {MOCK_PROJECTS.map(project => {
            const isOverBudget = project.actualCostSAR > project.budgetSAR;
            return (
              <div 
                key={project.id} 
                onClick={() => setSelectedAlert(project)}
                className={`relative p-6 rounded-[32px] border transition-all cursor-pointer group overflow-hidden ${isOverBudget ? 'bg-red-50 border-red-100 hover:border-red-400' : 'bg-slate-50 border-slate-100 hover:border-makana-navy'}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{project.name}</h3>
                    <p className="text-xs font-bold text-slate-500">{project.client}</p>
                  </div>
                  {isOverBudget ? (
                    <div className="flex flex-col items-end">
                      <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-full shadow-lg animate-pulse mb-1">RED ALERT</span>
                      <p className="text-[10px] text-red-600 font-black">+8.4% Variance</p>
                    </div>
                  ) : (
                    <CheckCircle2 size={24} className="text-emerald-500" />
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400 mb-2">
                      <span>Capital Expenditure</span>
                      <span className={isOverBudget ? 'text-red-600' : 'text-slate-900'}>
                        {project.actualCostSAR.toLocaleString()} / {project.budgetSAR.toLocaleString()} SAR
                      </span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                      <div 
                        className={`h-full transition-all duration-1000 ${isOverBudget ? 'bg-red-500' : 'bg-makana-navy'}`}
                        style={{ width: `${Math.min((project.actualCostSAR / project.budgetSAR) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-white/50 p-3 rounded-2xl border border-white/50">
                       <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Man-Hours</p>
                       <p className={`text-sm font-black ${project.actualManHours > project.plannedManHours ? 'text-red-600' : 'text-slate-900'}`}>
                         {project.actualManHours.toLocaleString()} Hrs
                       </p>
                    </div>
                    <div className="bg-white/50 p-3 rounded-2xl border border-white/50">
                       <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Leakage Saved</p>
                       <p className="text-sm font-black text-emerald-600">6.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Vision: Executive Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-makana-navy text-white rounded-[40px] p-10 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
             <div>
               <h3 className="text-2xl font-black mb-4">Executive Summary: The Industrial AI Revolution</h3>
               <p className="text-slate-400 leading-relaxed text-sm">
                 To the CEO of Makana Industries, <br /><br />
                 Traditional ERP systems (Tally, SAP B1) are historians—they tell you what happened last month. 
                 The <span className="text-makana-orange font-bold italic">Makana OS</span> is a strategist. By integrating AI-driven Job Costing with ZATCA Phase 2 compliance and autonomous Saudi Labor logic, we aren't just doing accounting; we are optimizing for <strong>15% Operational Leakage Reduction.</strong>
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Cpu className="text-makana-orange mb-4" size={24} />
                  <h4 className="font-black text-sm mb-2">Autonomous EPC Ledger</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Every SAR is linked to an Aramco Project ID automatically. No manual allocation errors.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Globe className="text-blue-400 mb-4" size={24} />
                  <h4 className="font-black text-sm mb-2">Kingdom Compliance</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">Direct Mudad, GOSI, and ZATCA integration for zero-manual reporting.</p>
                </div>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-makana-orange/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        </div>

        {/* Pitch Deck Outline */}
        <div className="bg-white rounded-[40px] border border-slate-100 p-8 shadow-sm">
           <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
             <Layers className="text-makana-orange" size={20} />
             15% Leakage Savings
           </h3>
           <div className="space-y-5">
              {[
                { label: 'Procurement Timing', val: '4.2%', desc: 'Steel price prediction logic' },
                { label: 'OT Leakage Prevention', val: '5.1%', desc: 'Smart Timesheet OT thresholds' },
                { label: 'VAT Optimization', val: '2.8%', desc: 'Automated ZATCA reconciliation' },
                { label: 'Idle Resource Cost', val: '2.9%', desc: 'AI Asset utilization mapping' },
              ].map((item, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-tight">{item.label}</span>
                    <span className="text-xs font-black text-makana-orange bg-makana-orange/5 px-2 py-0.5 rounded-lg">{item.val}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                  <div className="w-full h-1 bg-slate-50 rounded-full mt-2 group-hover:bg-makana-orange/10 transition-colors"></div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 bg-slate-50 text-slate-700 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-slate-100 hover:bg-makana-navy hover:text-white transition-all">
             Download Strategic Roadmap PDF
           </button>
        </div>
      </div>

      {/* Technical Architecture View */}
      <div className="bg-slate-50 rounded-[40px] p-10 border border-slate-100">
        <h3 className="text-xl font-black text-slate-900 mb-8 text-center uppercase tracking-[0.2em]">Technical Architecture: Makana AI-Cloud</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-makana-navy shadow-sm border border-slate-100 mb-4">
                <ShieldCheck size={32} />
             </div>
             <h4 className="font-black text-sm uppercase mb-2">Secure Core</h4>
             <p className="text-[10px] text-slate-500">KSA Data Residency Compliant (CST Standards)</p>
           </div>
           <div className="flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-makana-orange shadow-sm border border-slate-100 mb-4">
                <Zap size={32} />
             </div>
             <h4 className="font-black text-sm uppercase mb-2">Native Integration</h4>
             <p className="text-[10px] text-slate-500">ZATCA API, Mudad Webhooks, Bank Open APIs</p>
           </div>
           <div className="flex flex-col items-center text-center">
             <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100 mb-4">
                <Globe size={32} />
             </div>
             <h4 className="font-black text-sm uppercase mb-2">Edge-Mobile</h4>
             <p className="text-[10px] text-slate-500">Real-time Site Sync for supervisors (PWA)</p>
           </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={!!selectedAlert} onClose={() => setSelectedAlert(null)} title={`Project Audit: ${selectedAlert?.name}`}>
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-red-50 p-6 rounded-3xl border border-red-100">
            <AlertCircle className="text-red-500" size={32} />
            <div>
              <p className="text-xs font-black text-red-600 uppercase mb-1 tracking-widest">Financial Overrun Detected</p>
              <h4 className="text-xl font-black text-slate-900">{(selectedAlert?.actualCostSAR - selectedAlert?.budgetSAR).toLocaleString()} SAR Above Plan</h4>
            </div>
          </div>

          <div className="space-y-4">
             <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">AI Diagnostic Analysis</h5>
             <div className="space-y-3">
               {[
                 { label: 'Overtime Leakage', val: '350,000 SAR', reason: 'Unplanned night-shifts at Jubail-RTIP.' },
                 { label: 'Material Variance', val: '12,500 SAR', reason: 'Market price fluctuation for Stainless Steel.' },
                 { label: 'Asset Idle Time', val: '18,000 SAR', reason: 'Crane-02 breakdown caused 4-day delay.' },
               ].map((d, i) => (
                 <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black text-slate-800">{d.label}</p>
                      <p className="text-[10px] text-slate-400">{d.reason}</p>
                    </div>
                    <span className="text-xs font-black text-red-600">{d.val}</span>
                 </div>
               ))}
             </div>
          </div>

          <button className="w-full bg-makana-navy text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 shadow-xl">
            Authorize Resource Realignment
          </button>
        </div>
      </Modal>
    </div>
  );
};
