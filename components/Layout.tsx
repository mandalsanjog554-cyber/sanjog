
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  HardHat, 
  Truck, 
  ShieldAlert, 
  Menu, 
  Bell,
  LogOut,
  WalletMinimal,
  UserCheck,
  Target
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean, key?: string }) => (
  <Link 
    to={path} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-makana-orange text-white shadow-lg' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

interface AppLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Target, label: 'Strategy Hub', path: '/strategy' },
    { icon: WalletMinimal, label: 'Financial Hub', path: '/finance' },
    { icon: UserCheck, label: 'Workforce', path: '/workforce' },
    { icon: Users, label: 'Personnel', path: '/personnel' },
    { icon: HardHat, label: 'Field Portal', path: '/field' },
    { icon: Truck, label: 'Assets', path: '/assets' },
    { icon: ShieldAlert, label: 'Safety/HSE', path: '/safety' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-makana-navy text-white transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-makana-orange rounded flex items-center justify-center font-bold text-xl">M</div>
            <h1 className="text-xl font-bold tracking-tight text-white">MAKANA</h1>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem 
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={location.pathname === item.path}
              />
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-3"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center space-x-4 ml-auto">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-makana-navy flex items-center justify-center text-white font-medium text-sm">
                SA
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">Sami Al-Otaibi</p>
                <p className="text-xs text-slate-500 mt-1">General Manager</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
