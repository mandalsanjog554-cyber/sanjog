
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  AlertCircle, 
  ArrowRight, 
  Globe, 
  Cpu, 
  Zap, 
  Activity,
  Terminal,
  Server
} from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate enterprise-grade authentication delay
    setTimeout(() => {
      if (username === 'demo' && password === 'demo') {
        onLogin();
        navigate('/');
      } else {
        setError('SECURE PROTOCOL ERROR: Identity verification failed. Ensure credentials match Makana HR records.');
        setIsLoading(false);
      }
    }, 1200);
  };

  const handleDemoAccess = () => {
    setUsername('demo');
    setPassword('demo');
  };

  return (
    <div className="min-h-screen bg-[#050b16] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Immersive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-makana-orange rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
        {/* Grid Overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="max-w-5xl w-full bg-slate-900/40 backdrop-blur-xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 relative z-10">
        {/* Advanced Branding Side */}
        <div className="md:w-[45%] bg-gradient-to-br from-makana-navy via-[#0c1e3a] to-[#050b16] p-10 md:p-16 text-white flex flex-col justify-between relative">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-12">
              <div className="w-12 h-12 bg-makana-orange rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                <ShieldCheck className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter">MAKANA</h1>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">Systems Command</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
                Industrial <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-makana-orange to-orange-400">Intelligence.</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-medium">
                Proprietary operational excellence portal for the Kingdom's premier industrial contractor. Secure, real-time, and AI-optimized.
              </p>
            </div>

            {/* Live Telemetry Simulator */}
            <div className="mt-12 space-y-4 p-6 bg-white/5 rounded-3xl border border-white/5 backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span>System Pulse</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Active Sync
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Server size={14} className="text-makana-orange" />
                  <span className="text-xs font-mono">DC-Jubail-01</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-blue-400" />
                  <span className="text-xs font-mono">GMT +3 (KSA)</span>
                </div>
              </div>
              <div className="pt-2">
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-makana-orange h-full w-2/3 animate-[progress_2s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                <Cpu className="text-makana-orange" size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-tight">Core Protocol</p>
                <p className="text-[10px] text-slate-500">Aramco GI 2.1 Compliant</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-slate-500 uppercase">Timestamp</p>
              <p className="text-xs font-mono text-slate-300">{currentTime}</p>
            </div>
          </div>
        </div>

        {/* High-Standard Login Side */}
        <div className="md:w-[55%] p-10 md:p-16 flex flex-col justify-center relative bg-white/5 backdrop-blur-3xl">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-makana-orange mb-4 block">Identity Access Management</span>
            <h3 className="text-3xl font-black text-white mb-2">Login to Terminal</h3>
            <p className="text-slate-400 text-sm">Authorized personnel only. Sessions are monitored and encrypted.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="shrink-0 mt-0.5" size={20} />
                <p className="text-xs font-bold leading-relaxed">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Staff Identifier</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="text-slate-500 group-focus-within:text-makana-orange transition-colors" size={20} />
                </div>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Employee ID / Global UID"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-makana-orange/50 focus:border-makana-orange outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Key</label>
                <button type="button" className="text-[10px] font-bold text-slate-400 hover:text-white uppercase transition-colors">Forgot Key?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-slate-500 group-focus-within:text-makana-orange transition-colors" size={20} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-makana-orange/50 focus:border-makana-orange outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="group w-full relative h-[60px] bg-white text-makana-navy rounded-2xl font-black text-lg flex items-center justify-center gap-3 overflow-hidden transition-all hover:bg-makana-orange hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-[3px] border-makana-navy/20 border-t-makana-navy rounded-full animate-spin"></div>
                  <span>AUTHENTICATING...</span>
                </div>
              ) : (
                <>INITIALIZE PORTAL <ArrowRight className="group-hover:translate-x-2 transition-transform" size={22} /></>
              )}
            </button>
          </form>

          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="w-full flex items-center gap-4">
              <div className="h-px bg-white/5 flex-1"></div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Deployment Tier</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-2 w-full gap-4">
              <button 
                onClick={handleDemoAccess}
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <Terminal size={14} className="text-makana-orange group-hover:scale-125 transition-transform" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Demo Sandbox</span>
              </button>
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-white/5 bg-white/5 opacity-50 cursor-not-allowed">
                <Activity size={14} className="text-blue-400" />
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">On-Site Mesh</span>
              </div>
            </div>

            <div className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-emerald-500" />
                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">SSL 256-Bit</span>
               </div>
               <div className="flex items-center gap-2">
                 <Zap size={14} className="text-amber-500" />
                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">MFA Ready</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
