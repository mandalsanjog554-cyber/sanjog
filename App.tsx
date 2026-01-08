
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './pages/Landing';
import { Personnel } from './pages/Personnel';
import { FieldPortal } from './pages/FieldPortal';
import { FinancialHub } from './pages/FinancialHub';
import { LoginPage } from './pages/Login';
import { Workforce } from './pages/Workforce';
import { StrategyHub } from './pages/StrategyHub';

const Placeholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-white p-12">
    <h2 className="text-xl font-bold mb-2">{name} Module</h2>
    <p>This section is currently under development to meet Aramco 2024 standards.</p>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('makana_auth') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('makana_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('makana_auth');
  };

  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <AppLayout onLogout={handleLogout}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/strategy" element={<StrategyHub />} />
                  <Route path="/finance" element={<FinancialHub />} />
                  <Route path="/workforce" element={<Workforce />} />
                  <Route path="/personnel" element={<Personnel />} />
                  <Route path="/field" element={<FieldPortal />} />
                  <Route path="/assets" element={<Placeholder name="Asset Management" />} />
                  <Route path="/safety" element={<Placeholder name="HSE/Safety" />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/landing" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
