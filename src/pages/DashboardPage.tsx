import React from 'react';
import { Link } from 'react-router-dom';
import {
  FolderOpen,
  FileText,
  Package,
  Clock,
  AlertTriangle,
  Plus,
  Upload,
  PackagePlus,
  Share2,
  Search,
  Eye,
  PenLine
} from 'lucide-react';
import { dashboardStats, mockCases, mockActivities } from '../data/mockData';
import { useAccessibility } from '../hooks/useAccessibility';
import type { CaseRecord, ActivityEntry } from '../types';

const DashboardPage: React.FC = () => {
  const { t } = useAccessibility();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return <Upload size={16} className="text-govt-blue" />;
      case 'access': return <Eye size={16} className="text-green-govt" />;
      case 'share': return <Share2 size={16} className="text-orange-600" />;
      case 'sign': return <PenLine size={16} className="text-purple-600" />;
      case 'alert': return <AlertTriangle size={16} className="text-red-600" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'upload': return 'border-govt-blue';
      case 'access': return 'border-green-govt';
      case 'share': return 'border-orange-500';
      case 'sign': return 'border-purple-500';
      case 'alert': return 'border-red-500';
      default: return 'border-gray-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'badge-critical';
      case 'high': return 'badge-high';
      case 'medium': return 'badge-medium';
      case 'low': return 'badge-low';
      default: return 'badge';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'badge-active';
      case 'closed': return 'badge-inactive';
      case 'pending': return 'badge-pending';
      default: return 'badge';
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-300 pb-4">
        <h1 className="text-2xl font-bold text-navy-900 uppercase tracking-wide">
          {t('Investigation & Document Management Dashboard')}
        </h1>
        <p className="text-gray-600 mt-1">
          {t('Secure overview of cases, documents, evidence and system activity.')}
        </p>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="stat-card border-l-4 border-l-govt-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{t('ACTIVE CASES')}</p>
              <h3 className="text-2xl font-bold text-navy-900 mt-1">{dashboardStats?.activeCases?.toLocaleString() || '1,284'}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <FolderOpen className="text-govt-blue" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-l-4 border-l-green-govt">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{t('TOTAL DOCUMENTS')}</p>
              <h3 className="text-2xl font-bold text-navy-900 mt-1">{dashboardStats?.totalDocuments?.toLocaleString() || '18,492'}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <FileText className="text-green-govt" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-l-4 border-l-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{t('EVIDENCE RECORDS')}</p>
              <h3 className="text-2xl font-bold text-navy-900 mt-1">{dashboardStats?.evidenceRecords?.toLocaleString() || '5,721'}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Package className="text-purple-600" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{t('PENDING REVIEWS')}</p>
              <h3 className="text-2xl font-bold text-navy-900 mt-1">{dashboardStats?.pendingReviews?.toLocaleString() || '143'}</h3>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
        </div>

        <div className="stat-card border-l-4 border-l-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 tracking-wider uppercase">{t('SECURITY ALERTS')}</p>
              <h3 className="text-2xl font-bold text-navy-900 mt-1">{dashboardStats?.securityAlerts?.toLocaleString() || '3'}</h3>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link to="/cases" className="govt-btn-primary flex items-center">
          <Plus size={18} className="mr-2" />
          {t('+ Create Case')}
        </Link>
        <Link to="/documents" className="govt-btn-primary flex items-center">
          <Upload size={18} className="mr-2" />
          {t('+ Upload Document')}
        </Link>
        <Link to="/evidence" className="govt-btn-primary flex items-center">
          <PackagePlus size={18} className="mr-2" />
          {t('+ Register Evidence')}
        </Link>
        <Link to="/secure-sharing" className="govt-btn-secondary flex items-center">
          <Share2 size={18} className="mr-2" />
          {t('Secure Share')}
        </Link>
        <Link to="/cases" className="govt-btn-secondary flex items-center">
          <Search size={18} className="mr-2" />
          {t('Search Records')}
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Cases Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="govt-card p-0 overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300 px-4 py-3">
              <h2 className="text-lg font-bold text-navy-900 flex items-center">
                <FolderOpen className="mr-2" size={20} />
                {t('RECENT CASES')}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="govt-table w-full">
                <thead>
                  <tr>
                    <th>{t('Case ID')}</th>
                    <th>{t('Case Title')}</th>
                    <th>{t('Category')}</th>
                    <th>{t('Investigating Officer')}</th>
                    <th>{t('Priority')}</th>
                    <th>{t('Status')}</th>
                    <th>{t('Last Updated')}</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCases?.slice(0, 5).map((caseItem: CaseRecord) => (
                    <tr key={caseItem.id}>
                      <td className="font-medium text-govt-blue hover:underline">
                        <Link to={`/cases/${caseItem.id}`}>{caseItem.id}</Link>
                      </td>
                      <td className="max-w-xs truncate">{caseItem.title}</td>
                      <td>{t(caseItem.category)}</td>
                      <td>{caseItem.investigatingOfficer}</td>
                      <td>
                        <span className={`badge ${getPriorityBadge(caseItem.priority)}`}>
                          {t(caseItem.priority)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadge(caseItem.status)}`}>
                          {t(caseItem.status)}
                        </span>
                      </td>
                      <td className="text-gray-500 text-sm whitespace-nowrap">{t(caseItem.lastUpdated)}</td>
                    </tr>
                  ))}
                  {(!mockCases || mockCases.length === 0) && (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        {t('No cases found matching the criteria.')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-right">
              <Link to="/cases" className="text-govt-blue hover:underline text-sm font-medium">
                {t('View All Cases')} &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="lg:col-span-1">
          <div className="govt-card h-full">
            <div className="border-b border-gray-200 pb-3 mb-4">
              <h2 className="text-lg font-bold text-navy-900 flex items-center">
                <Clock className="mr-2" size={20} />
                {t('RECENT ACTIVITY')}
              </h2>
            </div>
            
            <div className="space-y-4">
              {mockActivities?.slice(0, 6).map((activity: ActivityEntry, idx: number) => (
                <div key={idx} className={`pl-4 border-l-4 py-1 ${getActivityColor(activity.type)}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-navy-800 flex items-center gap-2">
                        {getActivityIcon(activity.type)}
                        {t(activity.title)}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{t(activity.description)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <Link to="/audit-trail" className="text-govt-blue hover:underline text-sm font-medium">
                {t('Audit Trail')} &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
