import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, RotateCcw, FileText, ChevronRight, ShieldCheck } from 'lucide-react';
import { mockDocuments } from '../data/mockData';

export const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [classFilter, setClassFilter] = useState('ALL');

  const filteredDocs = useMemo(() => {
    return mockDocuments.filter(d => {
      const matchesSearch = d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            d.caseId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'ALL' || d.type === typeFilter;
      const matchesClass = classFilter === 'ALL' || d.classification === classFilter;
      return matchesSearch && matchesType && matchesClass;
    });
  }, [searchTerm, typeFilter, classFilter, mockDocuments]);

  const handleReset = () => {
    setSearchTerm('');
    setTypeFilter('ALL');
    setClassFilter('ALL');
  };

  const getBadgeColor = (val: string) => {
    const v = val.toUpperCase();
    if (['TOP_SECRET', 'RESTRICTED'].includes(v)) return 'bg-red-100 text-red-800 border-red-200';
    if (['CONFIDENTIAL'].includes(v)) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (['PUBLIC', 'INTERNAL'].includes(v)) return 'bg-green-100 text-green-800 border-green-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Document Repository</h1>
          <p className="text-sm text-gray-500 mt-1">Securely manage and verify digital evidence documents</p>
        </div>
        <button className="govt-btn-primary flex items-center space-x-2">
          <FileText size={16} />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="govt-card space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search documents by ID, name, or Case ID..." 
              className="govt-input pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="govt-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="ALL">All Types</option>
              <option value="FIR">FIR</option>
              <option value="Forensic Report">Forensic Report</option>
              <option value="Witness Statement">Witness Statement</option>
              <option value="Investigation Report">Investigation Report</option>
              <option value="Technical Report">Technical Report</option>
              <option value="Audit Report">Audit Report</option>
            </select>
            <select className="govt-select" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
              <option value="ALL">All Classifications</option>
              <option value="CONFIDENTIAL">Confidential</option>
              <option value="RESTRICTED">Restricted</option>
              <option value="SECRET">Secret</option>
              <option value="INTERNAL">Internal</option>
              <option value="PUBLIC">Public</option>
            </select>
            <button className="govt-btn-secondary p-2" title="Reset Filters" onClick={handleReset}>
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="govt-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="govt-table w-full">
            <thead>
              <tr>
                <th>Document ID</th>
                <th>Document Name</th>
                <th>Document Type</th>
                <th>Case ID</th>
                <th>Classification</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Integrity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="font-medium text-gray-900">{doc.id}</td>
                    <td className="max-w-xs truncate" title={doc.name}>
                      <div className="flex items-center">
                        <FileText size={16} className="text-gray-400 mr-2 flex-shrink-0" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                    </td>
                    <td>{doc.type.replace('_', ' ')}</td>
                    <td className="font-medium text-govt-blue">
                      <Link to={`/cases/${doc.caseId}`} className="hover:underline flex items-center">
                        {doc.caseId}
                      </Link>
                    </td>
                    <td>
                      <span className={`badge ${getBadgeColor(doc.classification)}`}>
                        {doc.classification.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{doc.uploadedBy}</td>
                    <td className="text-gray-500 whitespace-nowrap">{doc.date}</td>
                    <td>
                      <span className="badge bg-green-100 text-green-800 border-green-200 flex items-center w-max">
                        <ShieldCheck size={12} className="mr-1" /> VERIFIED
                      </span>
                    </td>
                    <td>
                      <Link to={`/documents/${doc.id}`} className="govt-btn-secondary px-3 py-1 text-xs whitespace-nowrap">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-500">
                    No documents found matching the criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing {filteredDocs.length} of {mockDocuments.length} entries</p>
        </div>
      </div>
    </div>
  );
};
