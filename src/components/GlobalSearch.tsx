import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FolderOpen, FileText, Package, X } from 'lucide-react';
import { mockCases, mockDocuments, mockEvidence } from '../data/mockData';
import { useAccessibility } from '../hooks/useAccessibility';

export const GlobalSearch: React.FC = () => {
  const { t, language } = useAccessibility();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<{type: string, id: string, title: string, subtitle: string}[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    if (query.length > 1) {
      const q = query.toLowerCase();
      const newResults = [];

      // Search Cases
      const cases = mockCases.filter(c => 
        c.id.toLowerCase().includes(q) || 
        c.title.toLowerCase().includes(q) ||
        (c.summary && c.summary.toLowerCase().includes(q))
      ).slice(0, 3).map(c => ({
        type: 'case',
        id: c.id,
        title: c.id,
        subtitle: c.title
      }));
      newResults.push(...cases);

      // Search Documents
      const docs = mockDocuments.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.id.toLowerCase().includes(q)
      ).slice(0, 3).map(d => ({
        type: 'document',
        id: d.id,
        title: d.name,
        subtitle: `Case: ${d.caseId}`
      }));
      newResults.push(...docs);

      // Search Evidence
      const evidence = mockEvidence.filter(e => 
        e.id.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q)
      ).slice(0, 3).map(e => ({
        type: 'evidence',
        id: e.id,
        title: e.id,
        subtitle: e.description.substring(0, 50) + '...'
      }));
      newResults.push(...evidence);

      setResults(newResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (result: any) => {
    setIsOpen(false);
    setQuery('');
    if (result.type === 'case') {
      navigate(`/cases/${result.id}`);
    } else if (result.type === 'document') {
      navigate(`/documents/${result.id}`);
    } else if (result.type === 'evidence') {
      navigate(`/evidence/${result.id}`);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'case': return <FolderOpen size={16} className="text-govt-blue" />;
      case 'document': return <FileText size={16} className="text-orange-500" />;
      case 'evidence': return <Package size={16} className="text-green-600" />;
      default: return <Search size={16} />;
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="govt-input pl-10 pr-10 w-full"
          placeholder={t('Search cases, documents, evidence, persons...')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true); }}
        />
        {query && (
          <button 
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => { setQuery(''); setIsOpen(false); }}
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-96 overflow-y-auto">
          <ul className="py-1">
            {results.map((result, idx) => (
              <li 
                key={`${result.type}-${result.id}-${idx}`}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 flex items-start"
                onClick={() => handleSelect(result)}
              >
                <div className="mt-0.5 mr-3 p-1.5 bg-gray-100 rounded-md">
                  {getIcon(result.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {result.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {result.subtitle}
                  </p>
                </div>
                <div className="ml-2 text-[10px] uppercase font-bold text-gray-400">
                  {t(result.type)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isOpen && query.length > 1 && results.length === 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 p-4 text-center text-sm text-gray-500">
          {language === 'hi' ? `"${query}" ${t('No results found for')}` : `${t('No results found for')} "${query}"`}
        </div>
      )}
    </div>
  );
};
