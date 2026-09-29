import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, RefreshCw, Globe } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useAccessibility } from '../hooks/useAccessibility';

export const LoginPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t, language, setLanguage } = useAccessibility();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (captcha !== '10') {
      setError(t('Invalid captcha.'));
      return;
    }

    try {
      login(userId, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('Login failed. Please check your credentials.');
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#003366 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Language Switcher in Login Screen */}
      <div className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-white px-3 py-1.5 rounded border border-gray-300 shadow-xs text-xs">
        <Globe size={14} className="text-govt-blue" />
        <button
          onClick={() => setLanguage('hi')}
          className={`px-1.5 py-0.5 rounded transition-colors ${language === 'hi' ? 'bg-saffron text-white font-bold' : 'text-gray-700 hover:text-govt-blue'}`}
        >
          हिन्दी
        </button>
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setLanguage('en')}
          className={`px-1.5 py-0.5 rounded transition-colors ${language === 'en' ? 'bg-saffron text-white font-bold' : 'text-gray-700 hover:text-govt-blue'}`}
        >
          English
        </button>
      </div>

      <div className="max-w-md w-full space-y-8 z-10 govt-card p-8 shadow-xl border-t-4 border-govt-blue">
        <div className="text-center">
          <img src="/favicon.png" alt="Emblem" className="mx-auto h-20 w-20 object-contain rounded-full shadow-sm mb-3" />
          <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{t('Government of India')}</h2>
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{t('Ministry of Home Affairs')}</h3>
          <h1 className="mt-2 text-2xl font-extrabold text-gray-900">{t('National Crime Records Bureau')}</h1>
          
          <div className="mt-6 py-2 px-4 bg-blue-50 border border-blue-100 rounded-md inline-flex items-center space-x-2">
            <ShieldCheck size={20} className="text-govt-blue" />
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-govt-blue">{t('Secure Digital Investigation Portal')}</span>
              <span className="text-xs text-gray-600 font-medium">{t('Authorized Personnel Only')}</span>
            </div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm border border-red-200">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                {t('Officer / User ID')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  className="govt-input pl-10 block w-full sm:text-sm"
                  placeholder={t('Enter your ID')}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('Password')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="govt-input pl-10 block w-full sm:text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-mono font-bold bg-white px-3 py-1 border border-gray-300 rounded shadow-inner text-gray-800">
                  7 + 3 =
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  required
                  className="w-16 govt-input text-center font-bold"
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  placeholder="?"
                />
                <button type="button" className="p-1 text-gray-500 hover:text-govt-blue">
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-govt-blue focus:ring-govt-blue border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                {t('Remember this device')}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-govt-blue hover:text-navy-700">
                {t('Forgot password?')}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="govt-btn-primary w-full flex justify-center py-2.5 text-sm uppercase tracking-wider"
            >
              {t('Secure Login')}
            </button>
          </div>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4 flex justify-around text-xs text-green-700 font-medium">
          <div className="flex items-center space-x-1">
            <ShieldCheck size={14} />
            <span>{t('256-bit Encryption')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Lock size={14} />
            <span>{t('Secure Connection')}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-gray-500 z-10">
        <p>{t('This is a demonstration prototype for SIH 2026.')}</p>
        <p className="mt-1">{t('Not for official production use.')}</p>
      </div>
    </div>
  );
};
