import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, User, LogOut, Globe, Accessibility, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAccessibility } from '../hooks/useAccessibility';

import { GlobalSearch } from './GlobalSearch';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { fontSize, setFontSize, language, setLanguage } = useAccessibility();

  return (
    <header className="flex flex-col w-full shadow-md z-50">
      {/* Top Strip */}
      <div className="bg-navy-900 text-white py-1 px-4 flex justify-between items-center text-xs">
        <div className="flex space-x-4">
          <span>Government of India | Digital India</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-saffron text-white px-2 py-0.5 rounded text-[10px] font-bold">DEMO PROTOTYPE</span>
          <div className="flex items-center space-x-1 border-l border-navy-700 pl-4">
            <button onClick={() => setFontSize('small')} className="hover:text-saffron transition-colors">A-</button>
            <button onClick={() => setFontSize('medium')} className="hover:text-saffron transition-colors">A</button>
            <button onClick={() => setFontSize('large')} className="hover:text-saffron transition-colors">A+</button>
          </div>
          <div className="flex items-center space-x-1 border-l border-navy-700 pl-4">
            <Globe size={14} />
            <button onClick={() => setLanguage('hi')} className={`hover:text-saffron transition-colors ${language === 'hi' ? 'text-saffron' : ''}`}>Hindi</button>
            <span>|</span>
            <button onClick={() => setLanguage('en')} className={`hover:text-saffron transition-colors ${language === 'en' ? 'text-saffron' : ''}`}>English</button>
          </div>
          <div className="flex items-center space-x-1 border-l border-navy-700 pl-4">
            <Accessibility size={14} />
            <Link to="/help" className="hover:text-saffron transition-colors flex items-center space-x-1">
              <HelpCircle size={14} />
              <span>Help</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-3 px-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <img src="/favicon.png" alt="Emblem" className="h-12 w-12 object-contain rounded-full shadow-xs" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ministry of Home Affairs</span>
            <span className="text-xl font-bold text-govt-blue">National Crime Records Bureau</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-800">{user.name}</span>
                <span className="text-xs text-gray-500">{user.designation}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-govt-blue text-white flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>
              <button 
                onClick={logout}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 text-govt-blue font-semibold hover:text-navy-700">
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>

      {/* Secondary Bar */}
      <div className="bg-govt-blue-light text-white py-1.5 px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <div className="flex items-center space-x-2 shrink-0">
          <ShieldCheck size={18} />
          <span className="font-medium tracking-wide text-sm">Secure Digital Investigation & Document Management System</span>
        </div>
        <div className="w-full md:w-96 text-gray-900">
          <GlobalSearch />
        </div>
      </div>
    </header>
  );
};
