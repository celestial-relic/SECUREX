import React, { useState } from 'react';
import { Brain, Users, MapPin, Calendar, Package, AlertTriangle, Loader2 } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

interface AIAnalysisPanelProps {
  documentId: string;
  documentName: string;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({ documentId: _documentId, documentName }) => {
  const { t, language } = useAccessibility();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 500);
  };

  const aiSummaryText = language === 'hi' 
    ? 'केस NCRB-UP-2026-004821 से संबंधित जांच रिपोर्ट। दस्तावेज़ में तीन व्यक्तियों के गवाह बयानों, शहीद पथ जंक्शन से बरामद सीसीटीवी फुटेज और एक बरामद मोबाइल डिवाइस के विधि विज्ञान (FSL) विश्लेषण का संदर्भ दिया गया है। मुख्य साक्ष्य वस्तुओं में अपराध स्थल की तस्वीरें और डिजिटल उपकरण छवियां शामिल हैं जो वर्तमान में फोरेंसिक परीक्षण के अधीन हैं।'
    : 'Investigation report concerning Case NCRB-UP-2026-004821. The document references witness statements from three individuals, CCTV footage recovered from Shaheed Path junction, and forensic analysis of a recovered mobile device. Key evidence items include crime scene photographs and digital device images currently under forensic examination.';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
      <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-indigo-800">
          <Brain size={20} className="text-indigo-600" />
          <h3 className="text-lg font-semibold">{t('AI-Assisted Document Analysis')}</h3>
        </div>
        <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full border border-indigo-200">
          {documentName}
        </span>
      </div>

      {!showResults ? (
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {t('Leverage AI to extract key insights, entities, and summaries from this document to accelerate your investigation.')}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  {t('Analyzing...')}
                </>
              ) : (
                <>
                  <Brain size={16} className="mr-2" />
                  {t('Generate Summary')}
                </>
              )}
            </button>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-md transition-colors disabled:opacity-70 cursor-pointer"
            >
              {t('Extract Entities')}
            </button>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-md transition-colors disabled:opacity-70 cursor-pointer"
            >
              {t('Identify Keywords')}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6">
          {/* Summary */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wider">{t('AI Summary')}</h4>
            <div className="bg-gray-50 rounded-md p-4 text-gray-800 text-sm leading-relaxed border border-gray-200">
              {aiSummaryText}
            </div>
          </div>

          {/* Entities & Keywords Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">{t('Extracted Entities')}</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 border border-blue-100 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center text-blue-800">
                    <Users size={16} className="mr-2" />
                    <span className="text-sm font-medium">{t('Persons')}</span>
                  </div>
                  <span className="bg-blue-200 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">7</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center text-emerald-800">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm font-medium">{t('Locations')}</span>
                  </div>
                  <span className="bg-emerald-200 text-emerald-900 text-xs font-bold px-2 py-0.5 rounded-full">4</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center text-amber-800">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm font-medium">{t('Dates')}</span>
                  </div>
                  <span className="bg-amber-200 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">12</span>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-md p-3 flex items-center justify-between">
                  <div className="flex items-center text-purple-800">
                    <Package size={16} className="mr-2" />
                    <span className="text-sm font-medium">{t('Evidence')}</span>
                  </div>
                  <span className="bg-purple-200 text-purple-900 text-xs font-bold px-2 py-0.5 rounded-full">8</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">{t('Keywords')}</h4>
              <div className="flex flex-wrap gap-2">
                {(language === 'hi' 
                  ? ['सीसीटीवी फुटेज', 'गवाह बयान', 'वाहन नंबर', 'मोबाइल डिवाइस', 'विधि विज्ञान विश्लेषण', 'हज़रतगंज', 'शहीद पथ', 'एफआईआर']
                  : ['CCTV', 'Witness', 'Vehicle', 'Mobile Device', 'Forensic Analysis', 'Hazratganj', 'Shaheed Path', 'FIR']
                ).map(keyword => (
                  <span key={keyword} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-md">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">{t('IMPORTANT DISCLAIMER')}</h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>
                    {t('⚠ AI-generated analysis is for investigative assistance only. All findings require human verification and cannot be used as legal evidence. This analysis does not constitute a legal opinion or official investigation conclusion.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
