import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, ShieldCheck, Download, Share2, 
  Eye, History, ChevronRight, CheckCircle2, Lock, FileSignature, RefreshCw, Check
} from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { AIAnalysisPanel } from '../components/AIAnalysisPanel';
import { useAccessibility } from '../hooks/useAccessibility';

export const DocumentViewerPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const { t } = useAccessibility();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null);
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const document = useMemo(() => mockDocuments.find(d => d.id === docId), [docId]);

  const handleVerify = () => {
    setIsVerifying(true);
    setVerifyMessage(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifyMessage(t('SHA-256 Checksum matched. Digital Signature valid under Section 65B Indian Evidence Act.'));
      setTimeout(() => setVerifyMessage(null), 5000);
    }, 600);
  };

  const handleDownload = () => {
    setDownloadNotice(t('Encrypted document package generated for offline evidentiary review.'));
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  if (!document) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700">{t('Document not found')}</h2>
        <Link to="/documents" className="text-govt-blue hover:underline mt-4 inline-block">{t('Back to Documents')}</Link>
      </div>
    );
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP_SECRET': return 'text-red-700 border-red-700 bg-red-50';
      case 'RESTRICTED': return 'text-orange-700 border-orange-700 bg-orange-50';
      case 'CONFIDENTIAL': return 'text-yellow-700 border-yellow-700 bg-yellow-50';
      default: return 'text-green-700 border-green-700 bg-green-50';
    }
  };

  const isConfidential = ['TOP_SECRET', 'RESTRICTED', 'CONFIDENTIAL'].includes(document.classification);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-gray-500 font-medium">
        <Link to="/" className="hover:text-govt-blue">{t('Dashboard')}</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/documents" className="hover:text-govt-blue">{t('Documents')}</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-gray-900 truncate max-w-xs">{document.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column - Document Preview (60%) */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <div className="bg-white border border-gray-300 shadow-lg rounded-sm flex-1 p-8 md:p-12 relative min-h-[800px] overflow-hidden">
            {/* Watermark */}
            {isConfidential && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-45deg] z-0">
                <span className="text-[150px] font-black tracking-widest text-red-900 uppercase">
                  {document.classification}
                </span>
              </div>
            )}

            {/* Document Content Simulation */}
            <div className="relative z-10 max-w-2xl mx-auto space-y-8 font-serif">
              {/* Govt Header */}
              <div className="text-center border-b-2 border-gray-800 pb-6 mb-8">
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">{t('Government of India')}</h2>
                <h3 className="text-xl font-semibold">{document.uploadedBy}</h3>
                <p className="text-sm mt-2 text-gray-600">{t('Secure Digital Evidence Repository')}</p>
              </div>

              {/* Doc Meta */}
              <div className="flex justify-between items-start text-sm border border-gray-300 p-4 bg-gray-50">
                <div>
                  <p><strong>{t('Case Ref:')}</strong> {document.caseId}</p>
                  <p><strong>{t('Doc Ref:')}</strong> {document.id}</p>
                  <p><strong>{t('Type:')}</strong> {t(document.type)}</p>
                </div>
                <div className="text-right">
                  <p><strong>{t('Date:')}</strong> {document.date}</p>
                  <div className={`mt-2 inline-block px-3 py-1 border-2 font-bold text-xs uppercase ${getClassificationColor(document.classification)}`}>
                    {t(document.classification)}
                  </div>
                </div>
              </div>

              {/* Title & Body */}
              <div>
                <h1 className="text-2xl font-bold text-center underline mb-8">{document.name}</h1>
                <div className="space-y-4 text-justify leading-relaxed text-gray-800">
                  <p>This document constitutes the official record pertaining to the aforementioned case reference. The contents herein are digitally sealed and legally admissible under the Information Technology Act, 2000, and Bharatiya Sakshya Adhiniyam, 2023.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  <div className="bg-gray-100 p-4 border-l-4 border-gray-500 italic mt-6">
                    [Redacted block for security preview purposes]
                  </div>
                </div>
              </div>

              {/* Digital Signature Block */}
              <div className="mt-16 pt-8 border-t border-gray-300 flex justify-between">
                <div>
                  <div className="mb-2"><ShieldCheck size={40} className="text-green-600 opacity-50" /></div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{t('Digitally Signed By')}</p>
                  <p className="font-bold">{document.uploadedBy}</p>
                  <p className="text-xs text-gray-500">{document.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{t('Integrity Hash')}</p>
                  <p className="font-mono text-xs max-w-[200px] break-all">{document.sha256}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Info Panel (40%) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Actions Toolbar */}
          <div className="govt-card p-3 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button 
                onClick={() => window.print()}
                className="govt-btn-secondary text-xs flex items-center justify-center gap-1.5 py-1.5"
                title="Print official copy"
              >
                <Eye size={14} /> {t('View / Print')}
              </button>
              <button 
                onClick={handleDownload}
                className="govt-btn-secondary text-xs flex items-center justify-center gap-1.5 py-1.5"
              >
                <Download size={14} /> {t('Download')}
              </button>
              <Link 
                to="/secure-sharing" 
                className="govt-btn-secondary text-xs flex items-center justify-center gap-1.5 py-1.5 border-govt-blue text-govt-blue font-medium text-center"
              >
                <Share2 size={14} /> {t('Secure Share')}
              </Link>
              <button 
                onClick={handleVerify}
                disabled={isVerifying}
                className="govt-btn-primary text-xs flex items-center justify-center gap-1.5 py-1.5"
              >
                <RefreshCw size={14} className={isVerifying ? "animate-spin" : ""} />
                {isVerifying ? t('Verifying...') : t('Verify Integrity')}
              </button>
              <Link 
                to="/audit-trail" 
                className="govt-btn-secondary text-xs flex items-center justify-center gap-1.5 py-1.5"
              >
                <History size={14} /> {t('Audit Trail')}
              </Link>
            </div>

            {verifyMessage && (
              <div className="p-2.5 bg-green-100 border border-green-300 text-green-900 rounded text-xs flex items-center gap-2">
                <Check size={14} className="text-green-700 shrink-0" />
                <span>{verifyMessage}</span>
              </div>
            )}

            {downloadNotice && (
              <div className="p-2.5 bg-blue-100 border border-blue-300 text-blue-900 rounded text-xs flex items-center gap-2">
                <Download size={14} className="text-blue-700 shrink-0" />
                <span>{downloadNotice}</span>
              </div>
            )}
          </div>

          {/* Security Verification */}
          <div className="govt-card bg-green-50 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <ShieldCheck className="text-green-600 mr-2" /> {t('Security Verification')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white p-3 rounded border border-green-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <FileSignature size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">{t('Digital Signature')}</span>
                </div>
                <span className="badge bg-green-100 text-green-800 border-green-300">✓ VALID</span>
              </div>
              
              <div className="flex justify-between items-center bg-white p-3 rounded border border-green-100 shadow-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">{t('Integrity Check')}</span>
                </div>
                <span className="badge bg-green-100 text-green-800 border-green-300">✓ {t('Verified')}</span>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-semibold mb-1 uppercase">{t('SHA-256 Checksum')}</p>
                <div className="bg-white p-2 rounded border border-gray-200 font-mono text-xs break-all flex justify-between items-center">
                  <span className="text-gray-700">{document.sha256}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Information */}
          <div className="govt-card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t('Document Information')}</h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('Document ID')}</td>
                  <td className="py-2 font-mono">{document.id}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('Case Reference')}</td>
                  <td className="py-2">
                    <Link to={`/cases/${document.caseId}`} className="text-govt-blue hover:underline font-medium">
                      {document.caseId}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('Type:')}</td>
                  <td className="py-2">{t(document.type)}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('Classification')}</td>
                  <td className="py-2">
                    <span className={`badge ${getClassificationColor(document.classification)} px-2 py-0.5`}>
                      {t(document.classification)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('Uploaded By')}</td>
                  <td className="py-2">{document.uploadedBy}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('Upload Date')}</td>
                  <td className="py-2">{document.date}</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500 font-medium">{t('File Size')}</td>
                  <td className="py-2">{document.fileSize}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Chain of Custody */}
          <div className="govt-card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <Lock className="text-govt-blue mr-2" size={20} /> {t('Digital Chain of Custody')}
              </h3>
              <Link to="/audit-trail" className="text-govt-blue text-sm hover:underline flex items-center">
                <History size={14} className="mr-1"/> {t('Full Log')}
              </Link>
            </div>
            
            <div className="relative pl-6">
              {/* Vertical line connecting the dots */}
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-6">
                {document.chainOfCustody?.map((step, index) => (
                  <div key={index} className="relative">
                    {/* The Dot */}
                    <div className="absolute -left-[29px] top-1 w-6 h-6 rounded-full bg-white border-2 border-govt-blue flex items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-govt-blue"></div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm text-gray-900">{t(step.action)}</span>
                        <span className="text-xs text-green-700 bg-green-100 px-1.5 py-0.5 rounded flex items-center">
                          <ShieldCheck size={10} className="mr-1"/> {t(step.status)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {t('By')} <span className="font-medium text-gray-900">{step.user}</span> ({t(step.department)})
                      </div>
                      <div className="text-xs text-gray-400">
                        {step.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <AIAnalysisPanel documentId={document.id} documentName={document.name} />

        </div>
      </div>
    </div>
  );
};
