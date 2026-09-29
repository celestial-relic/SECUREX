import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { ChevronRight } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const { t } = useAccessibility();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {/* Breadcrumbs */}
          <div className="bg-white border-b border-gray-200 px-6 py-2 shadow-sm z-10 flex items-center text-sm">
            <Link to="/dashboard" className="text-gray-500 hover:text-govt-blue">{t('Home')}</Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const rawTitle = value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ');
              const translatedTitle = t(rawTitle);

              return (
                <div key={to} className="flex items-center">
                  <ChevronRight size={14} className="mx-2 text-gray-400" />
                  {last ? (
                    <span className="text-gray-800 font-medium">{translatedTitle}</span>
                  ) : (
                    <Link to={to} className="text-gray-500 hover:text-govt-blue">{translatedTitle}</Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex-1 overflow-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
