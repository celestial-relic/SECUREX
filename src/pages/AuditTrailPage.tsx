import { useState, useMemo } from 'react';
import { Search, RefreshCcw, Download, ShieldCheck, ShieldAlert, XCircle } from 'lucide-react';
import { mockAuditTrail } from '../data/mockData';
import { useAccessibility } from '../hooks/useAccessibility';

export default function AuditTrailPage() {
  const { t } = useAccessibility();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [caseFilter, setCaseFilter] = useState('');
  const [resultFilter, setResultFilter] = useState('All');

  const handleReset = () => {
    setFromDate('');
    setToDate('');
    setUserFilter('');
    setDepartmentFilter('All');
    setActionFilter('All');
    setCaseFilter('');
    setResultFilter('All');
  };

  const filteredLogs = useMemo(() => {
    return mockAuditTrail.filter(log => {
      if (departmentFilter !== 'All' && log.department !== departmentFilter) return false;
      if (actionFilter !== 'All' && log.action !== actionFilter) return false;
      if (resultFilter !== 'All' && log.result !== resultFilter) return false;
      if (userFilter && !log.user.toLowerCase().includes(userFilter.toLowerCase())) return false;
      if (caseFilter && log.resource && !log.resource.toLowerCase().includes(caseFilter.toLowerCase())) return false;
      if (fromDate && new Date(log.timestamp) < new Date(fromDate)) return false;
      if (toDate && new Date(log.timestamp) > new Date(toDate + 'T23:59:59')) return false;
      return true;
    });
  }, [fromDate, toDate, userFilter, departmentFilter, actionFilter, caseFilter, resultFilter]);

  const getResultBadge = (result: string) => {
    switch(result) {
      case 'AUTHORIZED': return <span className="badge badge-success"><ShieldCheck className="w-3 h-3 mr-1" /> {t('AUTHORIZED')}</span>;
      case 'BLOCKED': return <span className="badge badge-error"><ShieldAlert className="w-3 h-3 mr-1" /> {t('BLOCKED')}</span>;
      case 'FAILED': return <span className="badge badge-error"><XCircle className="w-3 h-3 mr-1" /> {t('FAILED')}</span>;
      default: return <span className="badge">{t(result)}</span>;
    }
  };

  const maskIp = (ip: string) => {
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.xxx.xxx`;
    }
    return ip;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">{t('System Audit Trail')}</h1>
        <p className="text-navy-600">{t('Comprehensive log of all system activities and access events')}</p>
      </div>

      <div className="govt-card p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('From Date')}</label>
            <input type="date" className="govt-input" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('To Date')}</label>
            <input type="date" className="govt-input" value={toDate} onChange={e => setToDate(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('User')}</label>
            <input type="text" className="govt-input" placeholder={t('Search user...')} value={userFilter} onChange={e => setUserFilter(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('Department')}</label>
            <select className="govt-select" value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)}>
              <option value="All">{t('All Departments')}</option>
              <option value="Investigation Division">{t('Investigation Division')}</option>
              <option value="Cyber Crime Cell">{t('Cyber Crime Cell')}</option>
              <option value="Forensic Science Laboratory">{t('Forensic Science Laboratory')}</option>
              <option value="Economic Offence Wing">{t('Economic Offence Wing')}</option>
              <option value="Women Safety Cell">{t('Women Safety Cell')}</option>
              <option value="District Legal Services">{t('District Legal Services')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('Action')}</label>
            <select className="govt-select" value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
              <option value="All">{t('All Actions')}</option>
              <option value="VIEW">{t('VIEW')}</option>
              <option value="DOWNLOAD">{t('DOWNLOAD')}</option>
              <option value="UPLOAD">{t('UPLOAD')}</option>
              <option value="EDIT">{t('EDIT')}</option>
              <option value="DELETE">{t('DELETE')}</option>
              <option value="SHARE">{t('SHARE')}</option>
              <option value="LOGIN">{t('LOGIN')}</option>
              <option value="SIGN">{t('SIGN')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('Case / Resource')}</label>
            <input type="text" className="govt-input" placeholder={t('Search resource...')} value={caseFilter} onChange={e => setCaseFilter(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">{t('Result')}</label>
            <select className="govt-select" value={resultFilter} onChange={e => setResultFilter(e.target.value)}>
              <option value="All">{t('All Results')}</option>
              <option value="AUTHORIZED">{t('AUTHORIZED')}</option>
              <option value="BLOCKED">{t('BLOCKED')}</option>
              <option value="FAILED">{t('FAILED')}</option>
            </select>
          </div>
          <div className="flex items-end space-x-2">
            <button className="govt-btn-primary flex-1 flex justify-center items-center">
              <Search className="w-4 h-4 mr-2" /> {t('Search')}
            </button>
            <button onClick={handleReset} className="govt-btn-secondary p-2">
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button className="govt-btn-secondary p-2" title={t('Export')}>
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="govt-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="govt-table w-full">
            <thead>
              <tr>
                <th>{t('Timestamp')}</th>
                <th>{t('User')}</th>
                <th>{t('Department')}</th>
                <th>{t('Action')}</th>
                <th>{t('Resource')}</th>
                <th>{t('IP Address')}</th>
                <th>{t('Result')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, idx) => (
                <tr key={`${log.timestamp}-${log.user}-${idx}`} className={log.result === 'BLOCKED' ? 'border-l-4 border-l-red-500 bg-red-50/30' : ''}>
                  <td className="whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="font-medium text-navy-900">{log.user}</td>
                  <td>{t(log.department)}</td>
                  <td><span className="badge badge-neutral">{t(log.action)}</span></td>
                  <td className="max-w-xs truncate" title={log.resource}>{log.resource}</td>
                  <td className="font-mono text-sm text-navy-600">{maskIp(log.ip)}</td>
                  <td>{getResultBadge(log.result)}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-navy-500">{t('No matching audit logs found.')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
