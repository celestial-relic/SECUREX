import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, RotateCcw, FileText, ChevronRight } from 'lucide-react';
import { mockCases } from '../data/mockData';
import { useAccessibility } from '../hooks/useAccessibility';
import type { CaseRecord } from '../types';

export const CasesPage: React.FC = () => {
  const { t } = useAccessibility();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const filteredCases = useMemo(() => {
    return mockCases.filter(c => {
      const matchesSearch = c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            c.investigatingOfficer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;
      const matchesType = typeFilter === 'ALL' || c.category === typeFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [searchTerm, statusFilter, priorityFilter, typeFilter]);

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('ALL');
    setPriorityFilter('ALL');
    setTypeFilter('ALL');
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch(priority.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      default: return 'bg-green-100 text-green-800 border border-green-200';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'under investigation': return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'review': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('Case Management')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('Manage and track digital evidence cases')}</p>
        </div>
        <button className="govt-btn-primary flex items-center space-x-2">
          <FileText size={16} />
          <span>{t('New Case')}</span>
        </button>
      </div>

      <div className="govt-card space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder={t('Search by Case ID, title, officer...')} 
              className="govt-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="govt-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="ALL">{t('All Status')}</option>
              <option value="Active">{t('Active')}</option>
              <option value="Under Investigation">{t('Under Investigation')}</option>
              <option value="Review">{t('Review')}</option>
              <option value="Closed">{t('Closed')}</option>
            </select>
            <select className="govt-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="ALL">{t('All Priorities')}</option>
              <option value="Critical">{t('Critical')}</option>
              <option value="High">{t('High')}</option>
              <option value="Medium">{t('Medium')}</option>
              <option value="Low">{t('Low')}</option>
            </select>
            <select className="govt-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="ALL">{t('All Categories')}</option>
              <option value="Women Safety">{t('Women Safety')}</option>
              <option value="Cyber Crime">{t('Cyber Crime')}</option>
              <option value="Economic Offence">{t('Economic Offence')}</option>
              <option value="Narcotics">{t('Narcotics')}</option>
            </select>
            <button className="govt-btn-secondary p-2" title={t('Reset Filters')} onClick={handleReset}>
              <RotateCcw size={18} />
            </button>
            <button className="govt-btn-secondary p-2 flex items-center space-x-1" title={t('Export')}>
              <Download size={18} />
              <span>{t('Export')}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="govt-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="govt-table w-full">
            <thead>
              <tr>
                <th>{t('Case ID')}</th>
                <th>{t('Case Title')}</th>
                <th>{t('Category')}</th>
                <th>{t('State')}</th>
                <th>{t('Investigating Officer')}</th>
                <th>{t('Priority')}</th>
                <th>{t('Status')}</th>
                <th>{t('Last Updated')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCases.length > 0 ? (
                filteredCases.map((c: CaseRecord) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="font-medium text-govt-blue">
                      <Link to={`/cases/${c.id}`} className="hover:underline flex items-center">
                        {c.id}
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </td>
                    <td>{c.title}</td>
                    <td>{t(c.category)}</td>
                    <td>{c.state}</td>
                    <td>{c.investigatingOfficer}</td>
                    <td>
                      <span className={`badge ${getPriorityBadgeClass(c.priority)}`}>
                        {t(c.priority)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(c.status)}`}>
                        {t(c.status)}
                      </span>
                    </td>
                    <td className="text-gray-500 whitespace-nowrap">{t(c.lastUpdated)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    {t('No cases found matching the criteria.')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {t('Showing')} {filteredCases.length} {t('of')} {mockCases.length} {t('entries')}
          </p>
          <div className="flex space-x-2">
            <button className="govt-btn-secondary px-3 py-1 text-sm disabled:opacity-50" disabled>{t('Previous')}</button>
            <button className="govt-btn-secondary px-3 py-1 text-sm disabled:opacity-50" disabled>{t('Next')}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
