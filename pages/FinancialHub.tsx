
import React, { useState, useRef, useMemo } from 'react';
import { 
  FileText, 
  Scan, 
  MessageSquare, 
  TrendingDown, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Zap,
  ChevronRight,
  Send,
  Loader2,
  BarChart3,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  ArrowRightCircle,
  Activity,
  Landmark,
  Globe,
  Target,
  ShieldCheck,
  Phone,
  MessageCircle,
  Mail,
  Table as TableIcon,
  Save,
  Wand2,
  History,
  Clock
} from 'lucide-react';
import { MOCK_INVOICES, MOCK_BANK_TXNS, MOCK_COMM_LOGS } from '../constants';
import { queryFinancialData } from '../services/geminiService';
import { Invoice, BankTransaction, CommunicationLog } from '../types';
import { Modal } from '../components/Modal';

export const FinancialHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ledgers' | 'spreadsheet' | 'telecom'>('ledgers');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'ai', text: string }>>([
    { role: 'ai', text: 'Fintech AI active. Ask me about burn rates, VAT, or direct communication with vendors.' }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<BankTransaction | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [txnSearch, setTxnSearch] = useState('');
  const [commSearch, setCommSearch] = useState('');

  // Spreadsheet state
  const [gridData, setGridData] = useState(MOCK_INVOICES.map(inv => ({
    id: inv.id,
    vendor: inv.vendor,
    amount: inv.amount,
    tax: inv.tax,
    total: inv.amount + inv.tax,
    status: inv.status,
    project: inv.projectId
  })));

  const metrics = useMemo(() => {
    const cashIn = MOCK_BANK_TXNS.filter(t => t.type === 'Credit').reduce((acc, t) => acc + t.amount, 0);
    const outstanding = MOCK_INVOICES.filter(i => i.status === 'Pending').reduce((acc, i) => acc + i.amount + i.tax, 0);
    const totalTransactions = MOCK_BANK_TXNS.length;
    return { cashIn, outstanding, totalTransactions };
  }, []);

  const filteredTxns = useMemo(() => {
    return MOCK_BANK_TXNS.filter(t => 
      t.description.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.category?.toLowerCase().includes(txnSearch.toLowerCase())
    );
  }, [txnSearch]);

  const filteredComms = useMemo(() => {
    return MOCK_COMM_LOGS.filter(c => 
      c.recipient.toLowerCase().includes(commSearch.toLowerCase()) ||
      c.summary.toLowerCase().includes(commSearch.toLowerCase())
    );
  }, [commSearch]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userText = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userText }]);
    
    setIsProcessing(true);
    const context = { invoices: MOCK_INVOICES, transactions: MOCK_BANK_TXNS };
    const response = await queryFinancialData(userText, context);
    setIsProcessing(false);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: response }]);
  };

  const initiateCall = (vendor: string) => {
    alert(`Initiating secure industrial VOIP call to: ${vendor}\nSession being recorded for audit MAK-COMM-001`);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Landmark className="text-makana-orange" />
            Makana Unified Finance & Comm
          </h1>
          <p className="text-slate-500">Autonomous Job Costing, Smart Spreadsheet & Industrial Telecom</p>
        </div>
        <div className="flex gap-2">
          <button 
            className="bg-makana-navy text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-all shadow-md text-sm font-bold"
          >
            <TableIcon size={16} /> Export to Real Excel
          </button>
          <button 
            className="bg-makana-orange text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-all shadow-md text-sm font-bold"
          >
            <Phone size={16} /> Broadcast Alert
          </button>
        </div>
      </div>

      {/* Hero Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-makana-navy rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Revenue</p>
          <h4 className="text-2xl font-black">{metrics.cashIn.toLocaleString()} <span className="text-xs font-medium text-slate-400">SAR</span></h4>
          <TrendingUp className="absolute bottom-4 right-4 text-emerald-400 opacity-20" size={48} />
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Outstanding</p>
          <h4 className="text-2xl font-black text-slate-900">{metrics.outstanding.toLocaleString()} <span className="text-xs font-medium text-slate-400">SAR</span></h4>
        </div>
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Sync Success</p>
          <h4 className="text-2xl font-black text-emerald-900">99.8%</h4>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Comm Health</p>
            <h4 className="text-2xl font-black text-slate-900">Active</h4>
          </div>
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-white bg-makana-navy flex items-center justify-center text-[10px] font-bold text-white">SA</div>
            <div className="w-8 h-8 rounded-full border-2 border-white bg-makana-orange flex items-center justify-center text-[10px] font-bold text-white">IK</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm w-fit">
        <button 
          onClick={() => setActiveTab('ledgers')}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'ledgers' ? 'bg-makana-navy text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Audit Ledgers
        </button>
        <button 
          onClick={() => setActiveTab('spreadsheet')}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'spreadsheet' ? 'bg-makana-navy text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Smart Spreadsheet
        </button>
        <button 
          onClick={() => setActiveTab('telecom')}
          className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'telecom' ? 'bg-makana-navy text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'}`}
        >
          Comm Center
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Tools */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'ledgers' && (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Global Transaction Stream</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" value={txnSearch} onChange={(e) => setTxnSearch(e.target.value)}
                    placeholder="Search ledger..." className="bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs outline-none"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredTxns.map(txn => (
                  <div key={txn.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-all flex items-center gap-4 group cursor-pointer" onClick={() => setSelectedTxn(txn)}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${txn.type === 'Credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'}`}>
                      {txn.type === 'Credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-xs font-black text-slate-800 uppercase">{txn.description}</span>
                        <span className={`text-xs font-black ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-slate-900'}`}>{txn.type === 'Credit' ? '+' : '-'}{txn.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-400 font-bold">{txn.date} • {txn.category}</span>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); initiateCall(txn.description); }} className="p-1 hover:text-makana-orange"><Phone size={14} /></button>
                          <button onClick={(e) => e.stopPropagation()} className="p-1 hover:text-makana-orange"><MessageCircle size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'spreadsheet' && (
            <div className="bg-[#0f172a] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px] text-slate-300">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-makana-orange/10 border border-makana-orange/20 rounded-lg text-makana-orange text-[10px] font-black uppercase">
                    <Wand2 size={12} /> AI Formula Mode
                  </div>
                  <input 
                    placeholder="Enter AI query e.g. 'Add 15% VAT column'..."
                    className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1 text-xs w-64 outline-none focus:ring-1 focus:ring-makana-orange"
                  />
                </div>
                <button className="flex items-center gap-2 bg-makana-orange text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg hover:scale-105 transition-all">
                  <Save size={14} /> Commit Changes
                </button>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-500">
                      <th className="p-3 border-r border-b border-slate-800">Invoice ID</th>
                      <th className="p-3 border-r border-b border-slate-800">Vendor</th>
                      <th className="p-3 border-r border-b border-slate-800">Base Amount</th>
                      <th className="p-3 border-r border-b border-slate-800">VAT (15%)</th>
                      <th className="p-3 border-r border-b border-slate-800">Gross Total</th>
                      <th className="p-3 border-b border-slate-800">Status</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-[11px]">
                    {gridData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 border-r border-b border-slate-800 text-slate-500">{row.id}</td>
                        <td className="p-3 border-r border-b border-slate-800 font-bold text-white">{row.vendor}</td>
                        <td className="p-3 border-r border-b border-slate-800 text-right">{row.amount.toLocaleString()}</td>
                        <td className="p-3 border-r border-b border-slate-800 text-right text-slate-500">{row.tax.toLocaleString()}</td>
                        <td className="p-3 border-r border-b border-slate-800 text-right font-black text-emerald-400">{row.total.toLocaleString()}</td>
                        <td className="p-3 border-b border-slate-800">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${row.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                            {row.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Empty Rows Simulator */}
                    {[...Array(10)].map((_, i) => (
                      <tr key={`empty-${i}`}>
                        <td className="p-3 border-r border-b border-slate-800 h-10"></td>
                        <td className="p-3 border-r border-b border-slate-800"></td>
                        <td className="p-3 border-r border-b border-slate-800"></td>
                        <td className="p-3 border-r border-b border-slate-800"></td>
                        <td className="p-3 border-r border-b border-slate-800"></td>
                        <td className="p-3 border-b border-slate-800"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'telecom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[600px]">
              {/* Comm List */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-5 border-b border-slate-50 bg-slate-50 flex items-center justify-between">
                  <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <History size={16} /> Audit Comm Log
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                    <input 
                      placeholder="Search history..." className="pl-7 pr-2 py-1 bg-white border border-slate-200 rounded text-[10px] outline-none"
                      value={commSearch} onChange={e => setCommSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {filteredComms.map(log => (
                    <div key={log.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${log.type === 'Call' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {log.type === 'Call' ? <Phone size={14} /> : <MessageCircle size={14} />}
                          </div>
                          <div>
                            <p className="text-xs font-black text-slate-800 uppercase">{log.recipient}</p>
                            <p className="text-[9px] text-slate-400 font-bold">{log.timestamp}</p>
                          </div>
                        </div>
                        <span className="text-[9px] font-black text-makana-orange">{log.linkedId}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed italic border-l-2 border-slate-200 pl-3 py-1">
                        {log.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comm Console */}
              <div className="bg-makana-navy rounded-3xl p-6 text-white space-y-8 flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-makana-orange/10 rounded-full blur-3xl"></div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20 animate-pulse">
                    <Phone size={32} className="text-makana-orange" />
                  </div>
                  <h4 className="text-xl font-black">Industrial Telecom Hub</h4>
                  <p className="text-xs text-slate-400">Secure AES-256 Encrypted Operations Line</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-blue-400" />
                      <span className="text-xs font-bold">HQ - Jubail Operations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-400 uppercase font-black">Connected</span>
                      <ChevronRight size={14} className="text-slate-600" />
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-makana-orange" />
                      <span className="text-xs font-bold">Emergency Site Alert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 uppercase font-black">Standby</span>
                      <ChevronRight size={14} className="text-slate-600" />
                    </div>
                  </div>
                </div>
                <button className="w-full bg-makana-orange text-white py-4 rounded-2xl font-black text-sm shadow-xl hover:scale-105 transition-all">
                  INITIALIZE CONFERENCE
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Fintech Terminal */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[600px] overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-900 text-white">
              <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <MessageSquare size={16} className="text-makana-orange" /> Fintech AI Terminal
              </h3>
              <Activity size={16} className="text-emerald-400 animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-4 rounded-2xl text-[11px] font-medium leading-relaxed ${msg.role === 'user' ? 'bg-makana-navy text-white shadow-lg' : 'bg-slate-100 text-slate-800'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isProcessing && <Loader2 className="animate-spin text-makana-orange mx-auto" size={16} />}
            </div>
            <form onSubmit={handleChat} className="p-4 border-t border-slate-100 flex gap-2">
              <input 
                value={chatInput} onChange={e => setChatInput(e.target.value)}
                placeholder="Ask about burn rates..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-makana-orange"
              />
              <button type="submit" className="bg-makana-orange text-white p-3 rounded-xl shadow-lg"><Send size={20} /></button>
            </form>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      <Modal isOpen={!!selectedTxn} onClose={() => setSelectedTxn(null)} title={`Ledger Audit: ${selectedTxn?.id}`}>
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
            <p className="text-[10px] font-black text-makana-orange uppercase tracking-[0.2em] mb-2">{selectedTxn?.category}</p>
            <h4 className="text-3xl font-black text-slate-900 mb-1">{selectedTxn?.amount.toLocaleString()} <span className="text-sm font-medium">SAR</span></h4>
            <p className="text-xs text-slate-500">{selectedTxn?.description}</p>
          </div>
          <div className="space-y-4">
             <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Automation Options</h5>
             <div className="grid grid-cols-2 gap-4">
                <button onClick={() => initiateCall(selectedTxn?.description || 'Vendor')} className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-makana-orange transition-all group flex items-center gap-3">
                   <Phone className="text-slate-400 group-hover:text-makana-orange" />
                   <span className="text-xs font-black uppercase text-slate-600">Quick Call</span>
                </button>
                <button className="p-4 bg-white border border-slate-100 rounded-2xl hover:border-makana-orange transition-all group flex items-center gap-3">
                   <Target className="text-slate-400 group-hover:text-makana-orange" />
                   <span className="text-xs font-black uppercase text-slate-600">Link Project</span>
                </button>
             </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
