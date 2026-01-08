
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, BarChart3, Users, ChevronRight } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans animate-in fade-in duration-700">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-makana-navy rounded flex items-center justify-center text-white font-bold text-2xl">M</div>
            <span className="text-xl font-bold tracking-tight text-makana-navy">MAKANA INDUSTRIES</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-slate-600 font-medium">
            <a href="#services" className="hover:text-makana-orange transition-colors">Services</a>
            <a href="#clients" className="hover:text-makana-orange transition-colors">Clients</a>
            <a href="#compliance" className="hover:text-makana-orange transition-colors">Compliance</a>
            <Link to="/login" className="bg-makana-navy text-white px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-md">
              Portal Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 bg-makana-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-makana-orange opacity-10 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left grid md:grid-cols-2 items-center gap-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-makana-orange/20 text-makana-orange text-sm font-bold rounded-full mb-6 uppercase tracking-widest">
              Contractor of Choice
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Operational Excellence in <span className="text-makana-orange">Saudi Industry</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
              Specializing in Orbital Welding, Piping, and Fabrication for Oil & Gas giants. We deliver Zero-Penalty compliance and 100% safety records.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-makana-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2">
                Our Capabilities <ChevronRight size={20} />
              </button>
              <Link to="/login" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-bold text-lg border border-white/20 transition-all text-center">
                Access Portal
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800" 
              alt="Industrial Welding" 
              className="rounded-2xl shadow-2xl border-4 border-white/10"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Employees', value: '500+' },
            { label: 'Welding Units', value: '120+' },
            { label: 'Zero-LTIs', value: '1000+' },
            { label: 'Saudi Aramco Score', value: '98%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-makana-navy mb-2">{stat.value}</p>
              <p className="text-slate-500 font-medium uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-makana-navy mb-4">Core Competencies</h2>
            <div className="w-20 h-1 bg-makana-orange mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap className="text-makana-orange" />, 
                title: 'Orbital Welding', 
                desc: 'Precision automatic welding systems for high-purity piping networks.' 
              },
              { 
                icon: <ShieldCheck className="text-makana-orange" />, 
                title: 'Piping & Fabrication', 
                desc: 'Full-service steel fabrication conforming to ASME and Aramco standards.' 
              },
              { 
                icon: <BarChart3 className="text-makana-orange" />, 
                title: 'Maintenance', 
                desc: 'Preventative and reactive maintenance for industrial facilities.' 
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="mb-6 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center group-hover:bg-makana-orange/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-makana-navy mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] mb-12">Trusted By Industrial Giants</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
             <div className="text-3xl font-black text-slate-800 italic">SAUDI ARAMCO</div>
             <div className="text-3xl font-black text-slate-800 italic">SABIC</div>
             <div className="text-3xl font-black text-slate-800 italic">MA'ADEN</div>
             <div className="text-3xl font-black text-slate-800 italic">SEC</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-makana-navy text-white pt-20 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-makana-orange rounded flex items-center justify-center text-white font-bold">M</div>
              <span className="text-xl font-bold tracking-tight">MAKANA INDUSTRIES</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Makana Industries & Service Co. Ltd. is committed to engineering excellence, safety, and the growth of the Kingdom's industrial vision.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact</h4>
            <p className="text-slate-400">Jubail Industrial City, KSA</p>
            <p className="text-slate-400">info@makana.com.sa</p>
            <p className="text-slate-400">+966 13 000 0000</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white">Safety Policy</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Procurement</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/10 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} Makana Industries & Service Co. Ltd. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};
