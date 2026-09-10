import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Shield, User, Clock, Activity, FolderOpen, 
  ChevronRight, MapPin, Calendar, FileBadge, Hash
} from 'lucide-react';
import { mockCases, mockDocuments, mockEvidence, mockAuditTrail } from '../data/mockData';

export const CaseDetailPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const caseData = useMemo(() => mockCases.find(c => c.id === caseId), [caseId]);
  const relatedDocs = useMemo(() => mockDocuments.filter(d => d.caseId === caseData?.id), [caseData]);
  const relatedEvidence = useMemo(() => mockEvidence.filter(e => e.caseId === caseData?.id), [caseData]);
  const relatedAudits = useMemo(() => mockAuditTrail.filter(a => a.caseId === caseData?.id), [caseData]);

  if (!caseData) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">Case not found</h2>
        <Link to="/cases" className="text-govt-blue hover:underline mt-4 inline-block">Back to Cases</Link>
      </div>
    );
  }

  const getBadgeColor = (val: string) => {
    const v = val.toUpperCase();
    if (['CRITICAL', 'HIGH'].includes(v)) return 'bg-red-100 text-red-800 border-red-200';
    if (['MEDIUM', 'UNDER_INVESTIGATION'].includes(v)) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (['OPEN', 'ACTIVE'].includes(v)) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (['CLOSED', 'VERIFIED'].includes(v)) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'documents', label: `Documents (${relatedDocs.length})`, icon: FileText },
    { id: 'evidence', label: `Evidence (${relatedEvidence.length})`, icon: Shield },
    { id: 'persons', label: `Persons (${caseData.persons?.length || 0})`, icon: User },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'audit', label: 'Audit Trail', icon: FileBadge },
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 font-medium">
        <Link to="/" className="hover:text-govt-blue">Dashboard</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/cases" className="hover:text-govt-blue">Cases</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900">{caseData.id}</span>
      </nav>

      {/* Header */}
      <div className="govt-card bg-white border-t-4 border-t-govt-blue shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{caseData.id}</h1>
              <span className={`badge ${getBadgeColor(caseData.status)}`}>{caseData.status.replace('_', ' ')}</span>
              <span className={`badge ${getBadgeColor(caseData.priority)}`}>{caseData.priority} Priority</span>
            </div>
            <h2 className="text-xl text-gray-700">{caseData.title}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Investigating Officer</p>
            <p className="font-semibold text-gray-900">{caseData.investigatingOfficer}</p>
            <p className="text-sm text-gray-600">{caseData.department}</p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors
                  ${isActive 
                    ? 'border-govt-blue text-govt-blue' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Icon size={18} className={`mr-2 ${isActive ? 'text-govt-blue' : 'text-gray-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="govt-card">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Case Summary</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{caseData.summary}</p>
              </div>

              <div className="govt-card">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Case Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 flex items-center"><Calendar size={14} className="mr-1"/> FIR Date</p>
                    <p className="font-medium mt-1">{caseData.firDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center"><MapPin size={14} className="mr-1"/> State</p>
                    <p className="font-medium mt-1">{caseData.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center"><MapPin size={14} className="mr-1"/> District</p>
                    <p className="font-medium mt-1">{caseData.district}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center"><Activity size={14} className="mr-1"/> Type</p>
                    <p className="font-medium mt-1">{caseData.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 flex items-center"><Shield size={14} className="mr-1"/> Department</p>
                    <p className="font-medium mt-1">{caseData.department}</p>
                  </div>
                </div>
              </div>

              <div className="govt-card">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Assigned Officers</h3>
                <table className="govt-table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {caseData.assignedOfficers?.map((off, i) => (
                      <tr key={i}>
                        <td className="font-medium">{off.name}</td>
                        <td>{off.designation}</td>
                        <td>{off.department}</td>
                        <td><span className="badge bg-gray-100 text-gray-800">{off.role}</span></td>
                      </tr>
                    )) || <tr><td colSpan={4}>No officers assigned</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="govt-card">
                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Recent Events</h3>
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pb-4">
                  {caseData.timeline?.slice(0, 5).map((event, i) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-govt-blue ring-4 ring-white"></div>
                      <p className="text-xs text-gray-500">{event.date}</p>
                      <p className="font-semibold text-sm text-gray-900 mt-1">{event.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <p className="text-xs text-gray-400 mt-1 italic">By: {event.user}</p>
                    </div>
                  )) || <p className="pl-4 text-sm text-gray-500">No events</p>}
                </div>
                {caseData.timeline && caseData.timeline.length > 5 && (
                  <button 
                    onClick={() => setActiveTab('timeline')}
                    className="text-govt-blue text-sm font-medium hover:underline w-full text-center mt-2"
                  >
                    View all events
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="govt-card p-0 overflow-hidden">
            <table className="govt-table w-full">
              <thead>
                <tr>
                  <th>Doc ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Classification</th>
                  <th>Date</th>
                  <th>Integrity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {relatedDocs.length > 0 ? relatedDocs.map(doc => (
                  <tr key={doc.id}>
                    <td className="font-medium text-govt-blue">
                      <Link to={`/documents/${doc.id}`} className="hover:underline">{doc.id}</Link>
                    </td>
                    <td>{doc.name}</td>
                    <td>{doc.type}</td>
                    <td><span className={`badge ${getBadgeColor(doc.classification)}`}>{doc.classification}</span></td>
                    <td className="text-gray-500">{doc.date}</td>
                    <td><span className="badge bg-green-100 text-green-800 border-green-200">✓ VERIFIED</span></td>
                    <td>
                      <Link to={`/documents/${doc.id}`} className="text-govt-blue hover:underline text-sm font-medium">View</Link>
                    </td>
                  </tr>
                )) : <tr><td colSpan={7} className="text-center py-4">No documents linked</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="govt-card p-0 overflow-hidden">
            <table className="govt-table w-full">
              <thead>
                <tr>
                  <th>Evidence ID</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Collected By</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {relatedEvidence.length > 0 ? relatedEvidence.map(ev => (
                  <tr key={ev.id}>
                    <td className="font-medium">{ev.id}</td>
                    <td>{ev.type}</td>
                    <td className="truncate max-w-xs">{ev.description}</td>
                    <td>{ev.collectedBy}</td>
                    <td className="text-gray-500">{ev.date}</td>
                    <td><span className={`badge ${getBadgeColor(ev.status)}`}>{ev.status}</span></td>
                  </tr>
                )) : <tr><td colSpan={6} className="text-center py-4">No evidence logged</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'persons' && (
          <div className="govt-card p-0 overflow-hidden">
            <table className="govt-table w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Age/Gender</th>
                  <th>Contact/Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {caseData.persons?.length ? caseData.persons.map((p, i) => (
                  <tr key={i}>
                    <td className="font-medium">{p.name}</td>
                    <td>{p.role}</td>
                    <td>{p.age} / {p.gender}</td>
                    <td>
                      <div className="text-sm">{p.relation || 'Direct Party'}</div>
                    </td>
                    <td><span className={`badge ${getBadgeColor(p.status || 'UNKNOWN')}`}>{p.status || 'Unknown'}</span></td>
                  </tr>
                )) : <tr><td colSpan={5} className="text-center py-4">No persons logged</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="govt-card">
            <h3 className="text-xl font-bold mb-6">Case Timeline</h3>
            <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
              {caseData.timeline?.map((event, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-govt-blue ring-4 ring-white"></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">{event.title}</h4>
                      <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border">
                        {event.date}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{event.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <User size={12} className="mr-1" /> {event.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="govt-card p-0 overflow-hidden">
             <table className="govt-table w-full text-sm">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>Resource</th>
                  <th>IP Address</th>
                </tr>
              </thead>
              <tbody>
                {relatedAudits.length > 0 ? relatedAudits.map((audit, i) => (
                  <tr key={i}>
                    <td className="whitespace-nowrap">{audit.timestamp}</td>
                    <td className="font-medium">{audit.user}</td>
                    <td><span className="font-semibold text-gray-700">{audit.action}</span></td>
                    <td className="text-gray-600 max-w-md truncate">{audit.resource}</td>
                    <td className="text-gray-400">{audit.ip}</td>
                  </tr>
                )) : <tr><td colSpan={5} className="text-center py-4">No audit logs found for this case</td></tr>}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};
