import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, FileText, Package, MapPin, Clock, ChevronDown, ChevronRight, CheckCircle } from 'lucide-react';
import { mockEvidence } from '../data/mockData';
import { StatusBadge } from '../components/StatusBadge';
import { useAccessibility } from '../hooks/useAccessibility';

export const EvidencePage: React.FC = () => {
  const { t } = useAccessibility();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Custody': return <StatusBadge label={t('In Custody')} variant="info" />;
      case 'Forensic Analysis': return <StatusBadge label={t('Forensic Analysis')} variant="warning" />;
      case 'Court Submitted': return <StatusBadge label={t('Court Submitted')} variant="restricted" />;
      default: return <StatusBadge label={t(status)} variant="internal" />;
    }
  };

  const filteredEvidence = mockEvidence.filter(e => {
    const matchSearch = e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        e.caseId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = !typeFilter || e.type === typeFilter;
    const matchStatus = !statusFilter || e.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('Evidence Registry')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('Manage and track physical and digital evidence chain of custody.')}</p>
        </div>
        <button className="govt-btn-primary flex items-center">
          <Plus size={18} className="mr-2" />
          {t('Register Evidence')}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="govt-input pl-10"
              placeholder={t('Search evidence...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <select className="govt-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="">{t('All Evidence Types')}</option>
              <option value="Physical">{t('Physical')}</option>
              <option value="Digital Device Image">{t('Digital Device Image')}</option>
              <option value="Photograph">{t('Photograph')}</option>
              <option value="Audio/Video">{t('Audio/Video')}</option>
              <option value="Biological">{t('Biological')}</option>
            </select>
          </div>
          <div className="w-full md:w-48">
            <select className="govt-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">{t('All Statuses')}</option>
              <option value="In Custody">{t('In Custody')}</option>
              <option value="Forensic Analysis">{t('Forensic Analysis')}</option>
              <option value="Court Submitted">{t('Court Submitted')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="govt-table w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 border-b border-gray-200 w-10"></th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Evidence ID')}</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Case ID')}</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Type:')}</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Description')}</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Date Collected')}</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Integrity')}</th>
                <th className="px-4 py-3 border-b border-gray-200 font-semibold">{t('Status')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {filteredEvidence.map((evidence) => (
                <React.Fragment key={evidence.id}>
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleRow(evidence.id)}>
                    <td className="px-4 py-4">
                      {expandedRows[evidence.id] ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                    </td>
                    <td className="px-4 py-4 font-medium text-govt-blue">{evidence.id}</td>
                    <td className="px-4 py-4">
                      <Link to={`/cases/${evidence.caseId}`} className="text-govt-blue hover:underline" onClick={(e) => e.stopPropagation()}>
                        {evidence.caseId}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center">
                        {evidence.type === 'Digital Device Image' ? <FileText size={16} className="text-gray-400 mr-2" /> : <Package size={16} className="text-gray-400 mr-2" />}
                        {t(evidence.type)}
                      </div>
                    </td>
                    <td className="px-4 py-4">{evidence.description}</td>
                    <td className="px-4 py-4">{evidence.date}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center text-green-700 text-xs font-medium">
                        <CheckCircle size={14} className="mr-1" />
                        {t(evidence.integrity)}
                      </span>
                    </td>
                    <td className="px-4 py-4">{getStatusBadge(evidence.status)}</td>
                  </tr>
                  
                  {expandedRows[evidence.id] && (
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                              <MapPin size={16} className="mr-2 text-gray-500" /> {t('Location Details')}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-medium text-gray-700">{t('Storage Location:')}</span> {evidence.location || 'Central Evidence Vault'}</p>
                            <p className="text-sm text-gray-600 mb-1"><span className="font-medium text-gray-700">{t('Collected By:')}</span> {evidence.collectedBy}</p>
                            <p className="text-sm text-gray-600"><span className="font-medium text-gray-700">{t('Collection Date:')}</span> {evidence.date}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                              <Clock size={16} className="mr-2 text-gray-500" /> {t('Digital Chain of Custody')}
                            </h4>
                            <div className="space-y-2">
                              {evidence.chainOfCustody && evidence.chainOfCustody.length > 0 ? (
                                evidence.chainOfCustody.map((step, sIdx) => (
                                  <div key={sIdx} className="p-2 bg-white rounded border border-gray-200 text-xs">
                                    <div className="flex justify-between items-center font-medium text-gray-800">
                                      <span>{t(step.action)}</span>
                                      <span className="text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">{t(step.status)}</span>
                                    </div>
                                    <p className="text-gray-600 mt-0.5">{step.user} — {t(step.department)}</p>
                                    <p className="text-gray-400 text-[10px] mt-0.5">{step.timestamp}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-gray-500">{t('No transfer history recorded.')}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
