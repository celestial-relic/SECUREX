import React, { useState } from 'react';
import { Shield, Lock, Clock, FileText, Send, Copy, Check, Info } from 'lucide-react';
import { mockCases, mockDocuments } from '../data/mockData';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { StatusBadge } from '../components/StatusBadge';

export const SecureSharingPage: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [department, setDepartment] = useState('');
  const [permission, setPermission] = useState('VIEW ONLY');
  const [expiration, setExpiration] = useState('24 Hours');
  const [watermark, setWatermark] = useState(true);
  const [downloadPerm, setDownloadPerm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredDocs = mockDocuments.filter(doc => doc.caseId === selectedCase);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCase && selectedDoc && department) {
      setShowSuccess(true);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Shield className="mr-2 text-govt-blue" size={28} />
          Secure Document Transfer
        </h1>
        <p className="text-sm text-gray-500 mt-1">Share documents securely with authorized departments and personnel.</p>
      </div>

      {!showSuccess ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Lock className="mr-2 text-gray-500" size={20} />
              Configure Secure Access
            </h2>
          </div>
          
          <form onSubmit={handleGenerate} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left Column */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Case *</label>
                  <select 
                    className="govt-select w-full"
                    value={selectedCase}
                    onChange={(e) => {
                      setSelectedCase(e.target.value);
                      setSelectedDoc('');
                    }}
                    required
                  >
                    <option value="">-- Select Case --</option>
                    {mockCases.map(c => (
                      <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Document *</label>
                  <select 
                    className="govt-select w-full"
                    value={selectedDoc}
                    onChange={(e) => setSelectedDoc(e.target.value)}
                    required
                    disabled={!selectedCase}
                  >
                    <option value="">-- Select Document --</option>
                    {filteredDocs.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.type})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Department *</label>
                  <select 
                    className="govt-select w-full"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  >
                    <option value="">-- Select Department --</option>
                    <option value="Forensic Science Laboratory">Forensic Science Laboratory</option>
                    <option value="District Legal Services">District Legal Services</option>
                    <option value="Court Registry">Court Registry</option>
                    <option value="Police Headquarters">Police Headquarters</option>
                    <option value="CBI">CBI</option>
                    <option value="State Women Commission">State Women Commission</option>
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Access Permission *</label>
                  <div className="space-y-2">
                    {['VIEW ONLY', 'VIEW & DOWNLOAD', 'FULL ACCESS'].map((perm) => (
                      <div key={perm} className="flex items-center">
                        <input
                          id={`perm-${perm}`}
                          name="permission"
                          type="radio"
                          className="h-4 w-4 text-govt-blue border-gray-300 focus:ring-govt-blue"
                          checked={permission === perm}
                          onChange={() => setPermission(perm)}
                        />
                        <label htmlFor={`perm-${perm}`} className="ml-3 block text-sm text-gray-700">
                          {perm}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Clock size={16} className="mr-1 text-gray-500" /> Expiration *
                  </label>
                  <select 
                    className="govt-select w-full"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                  >
                    <option value="1 Hour">1 Hour</option>
                    <option value="6 Hours">6 Hours</option>
                    <option value="12 Hours">12 Hours</option>
                    <option value="24 Hours">24 Hours</option>
                    <option value="48 Hours">48 Hours</option>
                    <option value="7 Days">7 Days</option>
                  </select>
                </div>

                <div className="pt-2 space-y-4 border-t border-gray-100">
                  <ToggleSwitch 
                    id="watermark-toggle"
                    label="Apply Dynamic Watermark"
                    checked={watermark}
                    onChange={setWatermark}
                  />
                  <ToggleSwitch 
                    id="download-toggle"
                    label="Enable Encrypted Download"
                    checked={downloadPerm}
                    onChange={setDownloadPerm}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-6 flex items-start">
              <Info className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" size={20} />
              <p className="text-sm text-blue-800">
                All document transfers are logged in the immutable audit trail. The recipient will require valid department credentials or multi-factor authentication to access the document link.
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200">
              <button type="submit" className="govt-btn-primary flex items-center">
                <Send size={18} className="mr-2" />
                GENERATE SECURE ACCESS
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-green-200 overflow-hidden animate-in fade-in duration-300">
          <div className="bg-green-50 p-6 border-b border-green-200 flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-4">
              <Check className="text-green-600" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-800">Secure access request created</h2>
              <p className="text-sm text-green-600">The document is now encrypted and ready for secure transfer.</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Access ID:</span>
                  <span className="font-mono font-medium text-gray-900">SHARE-2026-000482</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Encryption:</span>
                  <StatusBadge label="Enabled" variant="success" />
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Audit Logging:</span>
                  <StatusBadge label="Enabled" variant="success" />
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Expiration:</span>
                  <span className="font-medium text-gray-900">11 Sep 2026 — 14:30</span>
                </div>
              </div>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Recipient:</span>
                  <span className="font-medium text-gray-900">{department}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Permission:</span>
                  <span className="font-medium text-gray-900">{permission}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Watermark:</span>
                  <span className="font-medium text-gray-900">{watermark ? 'Enabled' : 'Disabled'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-md p-4">
              <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Secure Access Link</label>
              <div className="flex items-center">
                <code className="flex-1 bg-white border border-gray-300 rounded-l-md px-3 py-2 text-sm text-gray-600 truncate">
                  https://secure.ncrb.gov.in/access/SHARE-2026-000482?token=xyz987
                </code>
                <button 
                  onClick={handleCopy}
                  className={`flex items-center px-4 py-2 border border-l-0 rounded-r-md text-sm font-medium transition-colors ${
                    copied ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {copied ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setShowSuccess(false)}
                className="govt-btn-secondary"
              >
                Generate New Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Shares Table */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="mr-2 text-gray-500" size={20} />
          Recent Secure Shares
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="govt-table w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 border-b border-gray-200 font-semibold">Access ID</th>
                  <th className="px-4 py-3 border-b border-gray-200 font-semibold">Document</th>
                  <th className="px-4 py-3 border-b border-gray-200 font-semibold">Recipient</th>
                  <th className="px-4 py-3 border-b border-gray-200 font-semibold">Permission</th>
                  <th className="px-4 py-3 border-b border-gray-200 font-semibold">Expiration</th>
                  <th className="px-4 py-3 border-b border-gray-200 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900">SHARE-2026-000482</td>
                  <td className="px-4 py-3 flex items-center"><FileText size={14} className="mr-2 text-gray-400" /> FIR_4821.pdf</td>
                  <td className="px-4 py-3">Forensic Science Laboratory</td>
                  <td className="px-4 py-3 text-xs">VIEW ONLY</td>
                  <td className="px-4 py-3">11 Sep 2026</td>
                  <td className="px-4 py-3"><StatusBadge label="Active" variant="success" /></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900">SHARE-2026-000471</td>
                  <td className="px-4 py-3 flex items-center"><FileText size={14} className="mr-2 text-gray-400" /> Forensic_Report_4821.pdf</td>
                  <td className="px-4 py-3">District Legal Services</td>
                  <td className="px-4 py-3 text-xs">VIEW & DOWNLOAD</td>
                  <td className="px-4 py-3 text-red-600">10 Sep 2026</td>
                  <td className="px-4 py-3"><StatusBadge label="Expired" variant="danger" /></td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900">SHARE-2026-000463</td>
                  <td className="px-4 py-3 flex items-center"><FileText size={14} className="mr-2 text-gray-400" /> Financial_Audit_3421.pdf</td>
                  <td className="px-4 py-3">Court Registry</td>
                  <td className="px-4 py-3 text-xs">VIEW ONLY</td>
                  <td className="px-4 py-3">12 Sep 2026</td>
                  <td className="px-4 py-3"><StatusBadge label="Active" variant="success" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
