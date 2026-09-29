import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle, Activity, Info } from 'lucide-react';
import { securityMetrics, mockSecurityAlerts } from '../data/mockData';
import { useAccessibility } from '../hooks/useAccessibility';

export default function SecurityCenterPage() {
  const { t } = useAccessibility();

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'HIGH': return <span className="badge badge-error">{t('HIGH RISK')}</span>;
      case 'MEDIUM': return <span className="badge badge-warning">{t('MEDIUM RISK')}</span>;
      case 'LOW': return <span className="badge badge-success">{t('LOW RISK')}</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'UNDER REVIEW': return <span className="badge badge-warning">{t('UNDER REVIEW')}</span>;
      case 'RESOLVED': return <span className="badge badge-success">{t('RESOLVED')}</span>;
      case 'ESCALATED': return <span className="badge badge-error">{t('ESCALATED')}</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">{t('Security & System Monitoring')}</h1>
        <p className="text-navy-600">{t('Real-time system security status and alerts')}</p>
      </div>

      <div className="govt-card bg-green-govt text-white p-6 flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <ShieldCheck className="w-12 h-12 text-white" />
          <div>
            <h2 className="text-2xl font-bold">{t('SYSTEM STATUS: SECURE')}</h2>
            <p className="text-green-50">{t('All monitoring systems active and nominal.')}</p>
          </div>
        </div>
        <div className="text-right w-full md:w-auto">
          <div className="text-sm font-medium mb-1">{t('Overall Security Health')}: 92%</div>
          <div className="w-full md:w-48 h-3 bg-green-800 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-govt-blue" />
            <h3 className="font-semibold text-navy-900">{t('Login Attempts')}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-navy-600">{t('Total')}: {securityMetrics.loginAttempts.total.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden flex">
              <div className="bg-green-500 h-full" style={{ width: `${(securityMetrics.loginAttempts.success / securityMetrics.loginAttempts.total) * 100}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${(securityMetrics.loginAttempts.failed / securityMetrics.loginAttempts.total) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-green-600 font-medium">{t('Success')}: {securityMetrics.loginAttempts.success.toLocaleString()}</span>
              <span className="text-red-600 font-medium">{t('Failed')}: {securityMetrics.loginAttempts.failed.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheck className="w-6 h-6 text-govt-blue" />
            <h3 className="font-semibold text-navy-900">{t('Document Access')}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-navy-600">{t('Total')}: {securityMetrics.documentAccess.total.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden flex">
              <div className="bg-blue-500 h-full" style={{ width: `${(securityMetrics.documentAccess.authorized / securityMetrics.documentAccess.total) * 100}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${(securityMetrics.documentAccess.blocked / securityMetrics.documentAccess.total) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-blue-600 font-medium">{t('Authorized')}: {securityMetrics.documentAccess.authorized.toLocaleString()}</span>
              <span className="text-red-600 font-medium">{t('Blocked')}: {securityMetrics.documentAccess.blocked.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-saffron" />
            <h3 className="font-semibold text-navy-900">{t('Security Alerts')}</h3>
          </div>
          <div className="space-y-3">
             <div className="flex justify-between items-center border-b pb-2 border-gray-100">
              <span className="text-navy-600 text-sm">{t('Total Alerts')}</span>
              <span className="font-bold text-navy-900">{securityMetrics.securityAlerts.total}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
              <span className="text-navy-600 text-sm">{t('Resolved')}</span>
              <span className="font-bold text-green-600">{securityMetrics.securityAlerts.resolved}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-navy-600 text-sm">{t('Pending')}</span>
              <span className="font-bold text-saffron">{securityMetrics.securityAlerts.pending}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-navy-900 mb-4 border-b border-gray-200 pb-2">{t('Recent Security Alerts')}</h2>
        <div className="space-y-4">
          {mockSecurityAlerts.map(alert => (
            <div key={alert.id} className={`govt-card p-5 border-l-4 ${alert.riskLevel === 'HIGH' ? 'border-l-red-600 bg-red-50/20' : alert.riskLevel === 'MEDIUM' ? 'border-l-orange-500' : 'border-l-green-500'}`}>
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getRiskBadge(alert.riskLevel)}
                    <h3 className="font-bold text-lg text-navy-900">{t(alert.title)}</h3>
                  </div>
                  <p className="text-navy-700 mb-3">{t(alert.description)}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-navy-600">
                    <span className="flex items-center"><Activity className="w-4 h-4 mr-1"/> {alert.source}</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    {getStatusBadge(alert.status)}
                  </div>
                </div>
                <div className="flex flex-row md:flex-col gap-2 shrink-0">
                  <button className="govt-btn-primary text-sm px-3 py-1">{t('Review')}</button>
                  {alert.status !== 'ESCALATED' && <button className="border border-red-600 text-red-600 hover:bg-red-50 font-medium rounded text-sm px-3 py-1 transition-colors">{t('Escalate')}</button>}
                  {alert.status !== 'RESOLVED' && <button className="border border-navy-300 text-navy-600 hover:bg-navy-50 font-medium rounded text-sm px-3 py-1 transition-colors">{t('Dismiss')}</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
