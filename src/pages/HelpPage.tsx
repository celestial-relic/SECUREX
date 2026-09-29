import React from 'react';
import { 
  KeyRound, 
  HelpCircle, 
  Cpu, 
  Terminal, 
  Scale, 
  CheckCircle2 
} from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

export const HelpPage: React.FC = () => {
  const { t } = useAccessibility();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="govt-card p-6 border-l-4 border-l-govt-blue bg-white">
        <div className="flex items-start justify-between">
          <div>
            <span className="badge badge-info mb-2">SIH 2026 Problem Statement #26190</span>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {t('Secure Digital Document Management System — Operational Manual & Demo Guide')}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {t('Ministry of Home Affairs')} | {t('National Crime Records Bureau')} — Women Safety Division
            </p>
          </div>
          <HelpCircle size={40} className="text-govt-blue shrink-0 hidden sm:block" />
        </div>
      </div>

      {/* 3-Minute Judge Demo Flow */}
      <div className="govt-card p-6 bg-blue-50/50 border border-blue-200">
        <h2 className="text-lg font-bold text-govt-blue flex items-center gap-2 mb-3">
          <Terminal size={20} />
          {t('Recommended 3-Minute SIH Evaluation Walkthrough')}
        </h2>
        <p className="text-sm text-gray-700 mb-4">
          {t('Judges can experience the complete evidence and legal document lifecycle in order:')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">1</span>
            <div>
              <p className="font-semibold text-gray-900">{t('Dashboard Overview')}</p>
              <p className="text-xs text-gray-600">{t('Review 5 critical metric cards, Quick Action dispatchers, and live activity stream.')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">2</span>
            <div>
              <p className="font-semibold text-gray-900">{t('Case Investigation Workspace')}</p>
              <p className="text-xs text-gray-600">{t('Open Case #NCRB-UP-2026-004821 (Missing Person Investigation), browse timeline, assigned officers, and evidence tabs.')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">3</span>
            <div>
              <p className="font-semibold text-gray-900">{t('Digital Document Repository')}</p>
              <p className="text-xs text-gray-600">{t('Open FIR_4821.pdf to inspect cryptographic sealing, classification badges, and legal watermark simulation.')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">4</span>
            <div>
              <p className="font-semibold text-gray-900">{t('SHA-256 & Digital Chain of Custody')}</p>
              <p className="text-xs text-gray-600">{t('Verify tamper-proof hash integrity, digital signatures, and sequential custodian handover trail.')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">5</span>
            <div>
              <p className="font-semibold text-gray-900">{t('AI-Assisted Document Intelligence')}</p>
              <p className="text-xs text-gray-600">{t('Click "Generate Summary" to extract legal entities, evidence mentions, and structured executive briefs with statutory disclaimers.')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">6</span>
            <div>
              <p className="font-semibold text-gray-900">{t('Secure Document Transfer (RBAC)')}</p>
              <p className="text-xs text-gray-600">{t('Generate time-limited, watermarked, encrypted access tokens for inter-departmental sharing (FSL, Courts).')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">7</span>
            <div>
              <p className="font-semibold text-gray-900">{t('Immutable Audit Trail')}</p>
              <p className="text-xs text-gray-600">{t('Filter access logs by IP, action, resource, and officer. Highlight blocked unauthorized attempts.')}</p>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-gray-200 flex gap-3">
            <span className="font-bold text-govt-blue shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs">8</span>
            <div>
              <p className="font-semibold text-gray-900">{t('Security Center & Threat Monitoring')}</p>
              <p className="text-xs text-gray-600">{t('Investigate high-priority anomaly detection alerts (e.g. 47 document downloads in 8 minutes).')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Security & Legal Architecture */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="govt-card p-5">
          <div className="flex items-center gap-2 text-govt-blue font-bold mb-3">
            <Scale size={20} />
            <h3>{t('Legal & Compliance')}</h3>
          </div>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('Section 65B IT Act:')}</strong> {t('Cryptographic certificates verifying electronic record admissibility.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('Bharatiya Sakshya Adhiniyam, 2023:')}</strong> {t('Digital evidence sealing conforming to new criminal law frameworks.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('DPDP Act 2023:')}</strong> {t('PII redaction and sensitive witness information isolation.')}</span>
            </li>
          </ul>
        </div>

        <div className="govt-card p-5">
          <div className="flex items-center gap-2 text-govt-blue font-bold mb-3">
            <KeyRound size={20} />
            <h3>{t('Cryptographic Integrity')}</h3>
          </div>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('SHA-256 Hashing:')}</strong> {t('Instant pre- and post-storage hash calculation to prevent data tampering.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('PKI Digital Signatures:')}</strong> {t('Officer-stamped verification verifying identity and non-repudiation.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('Dynamic Watermarking:')}</strong> {t('Recipient-specific watermark injection preventing unauthorized dissemination.')}</span>
            </li>
          </ul>
        </div>

        <div className="govt-card p-5">
          <div className="flex items-center gap-2 text-govt-blue font-bold mb-3">
            <Cpu size={20} />
            <h3>{t('Responsible Gov-AI')}</h3>
          </div>
          <ul className="text-xs text-gray-700 space-y-2">
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('Human-in-the-loop:')}</strong> {t('AI does NOT make legal rulings or culpability determinations.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('Entity Extraction:')}</strong> {t('Rapid indexing of witnesses, locations, vehicle numbers, and weapon types.')}</span>
            </li>
            <li className="flex items-start gap-1.5">
              <CheckCircle2 size={14} className="text-green-600 shrink-0 mt-0.5" />
              <span><strong>{t('Air-Gapped Ready:')}</strong> {t('Model inferences can execute on localized NIC server clusters without public cloud exposure.')}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Emergency Contact & Notice */}
      <div className="govt-card p-5 bg-gray-50 border border-gray-300 text-xs text-gray-600">
        <p className="font-bold text-gray-900 mb-1">{t('PROTOTYPE NOTICE FOR SMART INDIA HACKATHON 2026')}</p>
        <p>
          {t('This software demonstration has been engineered strictly for the Grand Finale of Smart India Hackathon 2026.')}
          {' '}
          {t('All investigation cases, names, personnel records, FIR details, and SHA-256 checksums are synthetic and fictional.')}
          {' '}
          {t('No live Ministry of Home Affairs or NCRB databases or citizen data are connected.')}
        </p>
      </div>
    </div>
  );
};

export default HelpPage;
