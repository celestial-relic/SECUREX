import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

export default function SettingsPage() {
  const { language, setLanguage, t } = useAccessibility();
  const [activeTab, setActiveTab] = useState('general');
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  // General state
  const [systemName, setSystemName] = useState('NCRB Secure Digital Document Management');
  const [org, setOrg] = useState('National Crime Records Bureau');
  const [timeout, setTimeoutVal] = useState('30');

  // Security state
  const [minPwdLength, setMinPwdLength] = useState('12');
  const [req2fa, setReq2fa] = useState(true);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('3');
  const [lockoutDuration, setLockoutDuration] = useState('15');
  const [forcePwdChange, setForcePwdChange] = useState('90');

  // Document state
  const [defClass, setDefClass] = useState('CONFIDENTIAL');
  const [watermark, setWatermark] = useState(true);
  const [integrity, setIntegrity] = useState(true);
  const [maxSize, setMaxSize] = useState('50');
  const [allowedTypes, setAllowedTypes] = useState({ pdf: true, docx: true, xlsx: true, jpg: false, png: false });

  // Notifications state
  const [emailNotif, setEmailNotif] = useState(true);
  const [secAlertNotif, setSecAlertNotif] = useState(true);
  const [docShareNotif, setDocShareNotif] = useState(true);
  const [caseUpdateNotif, setCaseUpdateNotif] = useState(true);

  const handleSave = () => {
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">{t('System Settings')}</h1>
          <p className="text-navy-600">{t('Configure global application parameters and policies')}</p>
        </div>
        {showSavedMsg && (
          <div className="flex items-center text-green-700 bg-green-50 px-4 py-2 rounded-md border border-green-200">
            <CheckCircle className="w-5 h-5 mr-2" />
            {t('✓ Settings saved')}
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <div className="govt-card overflow-hidden">
            <nav className="flex flex-col">
              {[
                { id: 'general', label: 'General' },
                { id: 'security', label: 'Security & Access' },
                { id: 'documents', label: 'Document Policies' },
                { id: 'notifications', label: 'Notifications' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-left font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-govt-blue border-l-4 border-govt-blue' 
                      : 'text-navy-700 hover:bg-gray-50 border-l-4 border-transparent'
                  }`}
                >
                  {t(tab.label)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 govt-card p-6">
          {activeTab === 'general' && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-navy-900 border-b pb-2">{t('General Settings')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('System Name')}</label>
                  <input type="text" className="govt-input" value={systemName} onChange={e => setSystemName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Organization')}</label>
                  <input type="text" className="govt-input" value={org} onChange={e => setOrg(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Default Language')}</label>
                  <select className="govt-select" value={language} onChange={e => setLanguage(e.target.value as 'en' | 'hi')}>
                    <option value="en">English</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Session Timeout')}</label>
                  <select className="govt-select" value={timeout} onChange={e => setTimeoutVal(e.target.value)}>
                    <option value="15">{t('15 min')}</option>
                    <option value="30">{t('30 min')}</option>
                    <option value="60">{t('1 hour')}</option>
                    <option value="120">{t('2 hours')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-navy-900 border-b pb-2">{t('Security Settings')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Minimum Password Length')}</label>
                  <input type="number" className="govt-input" value={minPwdLength} onChange={e => setMinPwdLength(e.target.value)} />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={req2fa} onChange={e => setReq2fa(e.target.checked)} />
                    <span className="ml-2 text-navy-800 font-medium">{t('Require Two-Factor Authentication')}</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Maximum Login Attempts')}</label>
                  <input type="number" className="govt-input" value={maxLoginAttempts} onChange={e => setMaxLoginAttempts(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Account Lockout Duration')}</label>
                  <select className="govt-select" value={lockoutDuration} onChange={e => setLockoutDuration(e.target.value)}>
                    <option value="15">{t('15 min')}</option>
                    <option value="30">{t('30 min')}</option>
                    <option value="60">{t('1 hour')}</option>
                    <option value="1440">{t('24 hours')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Force Password Change')}</label>
                  <select className="govt-select" value={forcePwdChange} onChange={e => setForcePwdChange(e.target.value)}>
                    <option value="30">{t('30 days')}</option>
                    <option value="60">{t('60 days')}</option>
                    <option value="90">{t('90 days')}</option>
                    <option value="0">{t('Never')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-navy-900 border-b pb-2">{t('Document Policies')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Default Classification')}</label>
                  <select className="govt-select" value={defClass} onChange={e => setDefClass(e.target.value)}>
                    <option value="UNCLASSIFIED">{t('Unclassified')}</option>
                    <option value="RESTRICTED">{t('Restricted')}</option>
                    <option value="CONFIDENTIAL">{t('Confidential')}</option>
                    <option value="SECRET">{t('Secret')}</option>
                    <option value="TOP_SECRET">{t('Top Secret')}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">{t('Maximum Upload Size')}</label>
                  <select className="govt-select" value={maxSize} onChange={e => setMaxSize(e.target.value)}>
                    <option value="10">10MB</option>
                    <option value="25">25MB</option>
                    <option value="50">50MB</option>
                    <option value="100">100MB</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={watermark} onChange={e => setWatermark(e.target.checked)} />
                    <span className="ml-2 text-navy-800 font-medium">{t('Enable Watermarking')}</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={integrity} onChange={e => setIntegrity(e.target.checked)} />
                    <span className="ml-2 text-navy-800 font-medium">{t('Auto-verify Document Integrity')}</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">{t('Allowed File Types')}</label>
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(allowedTypes).map(([type, checked]) => (
                      <label key={type} className="flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" 
                          checked={checked} 
                          onChange={e => setAllowedTypes({...allowedTypes, [type]: e.target.checked})} 
                        />
                        <span className="ml-2 text-navy-800 uppercase">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <h2 className="text-xl font-semibold text-navy-900 border-b pb-2">{t('Notification Preferences')}</h2>
              
              <div className="space-y-4">
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} />
                  <div className="ml-3">
                    <span className="block text-navy-900 font-medium">{t('Email Notifications')}</span>
                    <span className="block text-sm text-navy-600">{t('Receive general system alerts and summaries via email')}</span>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={secAlertNotif} onChange={e => setSecAlertNotif(e.target.checked)} />
                  <div className="ml-3">
                    <span className="block text-navy-900 font-medium">{t('Security Alert Notifications')}</span>
                    <span className="block text-sm text-navy-600">{t('Immediate notifications for HIGH and MEDIUM risk security events')}</span>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={docShareNotif} onChange={e => setDocShareNotif(e.target.checked)} />
                  <div className="ml-3">
                    <span className="block text-navy-900 font-medium">{t('Document Shared Notifications')}</span>
                    <span className="block text-sm text-navy-600">{t('Notify when a new document is shared with you or your department')}</span>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                  <input type="checkbox" className="w-5 h-5 text-govt-blue rounded border-gray-300 focus:ring-govt-blue" checked={caseUpdateNotif} onChange={e => setCaseUpdateNotif(e.target.checked)} />
                  <div className="ml-3">
                    <span className="block text-navy-900 font-medium">{t('Case Update Notifications')}</span>
                    <span className="block text-sm text-navy-600">{t('Notifications for updates to cases you are assigned to')}</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
            <button className="govt-btn-primary flex items-center px-6" onClick={handleSave}>
              <Save className="w-5 h-5 mr-2" />
              {t('Save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
