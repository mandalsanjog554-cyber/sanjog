
import React from 'react';
import { Camera, Send, ClipboardCheck, Info, Users, Hammer, ShieldAlert } from 'lucide-react';

export const FieldPortal: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'dpr' | 'safety' | 'tbt'>('dpr');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Report Submitted Successfully to Makana HQ");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="bg-makana-navy p-6 rounded-2xl text-white shadow-lg">
        <h1 className="text-xl font-bold mb-1">Supervisor Portal</h1>
        <p className="text-slate-400 text-xs">Jubail RTIP Site | Shift: Morning</p>
      </div>

      <div className="flex p-1 bg-white rounded-xl shadow-sm border border-slate-100">
        <button 
          onClick={() => setActiveTab('dpr')}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all ${activeTab === 'dpr' ? 'bg-makana-orange text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <Hammer size={18} /> DPR
        </button>
        <button 
          onClick={() => setActiveTab('safety')}
          className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-all ${activeTab === 'safety' ? 'bg-makana-orange text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          <ShieldAlert size={18} /> Safety
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        {activeTab === 'dpr' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Project Package</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-makana-orange outline-none">
                <option>RTIP Package 4 - Piping</option>
                <option>SABIC Maintenance B12</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Inch-Dia Progress</label>
                <input type="number" placeholder="150" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Total Manpower</label>
                <input type="number" placeholder="12" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Weld Log Attachment</label>
              <button type="button" className="w-full border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-makana-orange transition-all">
                <Camera size={32} className="mb-2" />
                <span className="text-xs font-medium">Take Photo of Weld Log</span>
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-makana-navy text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : <><Send size={18} /> Submit Daily Report</>}
            </button>
          </form>
        )}

        {activeTab === 'safety' && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Observation Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['Safe', 'Unsafe', 'Near Miss'].map(type => (
                  <button key={type} type="button" className="py-2 border border-slate-200 rounded-lg text-xs font-bold hover:bg-makana-orange hover:text-white transition-all">
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Observation Details</label>
              <textarea 
                rows={4} 
                placeholder="Describe what happened or what was observed..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"
              ></textarea>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
              <Info className="text-blue-500 mt-1 shrink-0" size={18} />
              <p className="text-xs text-blue-700 leading-relaxed">
                Aramco HSE policy requires immediate reporting of all near-misses. Ensure all personnel are cleared from the area if unsafe.
              </p>
            </div>

            <button type="submit" className="w-full bg-makana-orange text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">
              <Send size={18} /> Submit Safety Log
            </button>
          </form>
        )}
      </div>

      <div className="bg-slate-100 p-6 rounded-2xl">
        <h3 className="text-slate-900 font-bold flex items-center gap-2 mb-4">
          <ClipboardCheck size={18} className="text-makana-navy" /> Previous Submissions
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">DPR-2024-03-{30-i}</p>
                <p className="text-[10px] text-slate-400">Status: Approved by HQ</p>
              </div>
              <span className="text-xs font-bold text-makana-orange">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
