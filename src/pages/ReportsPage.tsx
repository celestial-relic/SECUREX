import React, { useState } from 'react';
import { FileText, Download, Calendar, Activity, Loader2, CheckCircle } from 'lucide-react';
import { mockReports } from '../data/mockData';

export default function ReportsPage() {
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [readyId, setReadyId] = useState<string | null>(null);

  const handleGenerate = (id: string) => {
    setGeneratingId(id);
    setReadyId(null);
    setTimeout(() => {
      setGeneratingId(null);
      setReadyId(id);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Reports & Analytics</h1>
        <p className="text-navy-600">Generate and view detailed system analytics and audit reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockReports.map(report => (
          <div key={report.id} className="govt-card p-6 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-50 rounded-lg text-govt-blue">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-navy-900">{report.title}</h3>
                  <span className="badge badge-neutral mt-1">{report.category}</span>
                </div>
              </div>
              <span className="badge badge-neutral flex items-center bg-gray-100 text-gray-700 border border-gray-200">
                <Activity className="w-3 h-3 mr-1" /> {report.frequency}
              </span>
            </div>
            
            <p className="text-navy-600 mb-6 flex-grow">{report.description}</p>
            
            <div className="flex items-center text-sm text-navy-500 mb-6">
              <Calendar className="w-4 h-4 mr-2" />
              Last Generated: {new Date(report.lastGenerated).toLocaleString()}
            </div>

            {readyId === report.id ? (
              <div className="bg-green-50 border border-green-200 rounded p-4 flex items-center justify-between">
                <span className="text-green-700 flex items-center font-medium text-sm">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  ✓ Report generated successfully.
                </span>
                <button className="govt-btn-primary py-1.5 px-3 flex items-center text-sm">
                  <Download className="w-4 h-4 mr-1" /> Download
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 mt-auto">
                <button className="govt-btn-primary flex-1">View Report</button>
                <button 
                  className="govt-btn-secondary flex-1 flex items-center justify-center"
                  onClick={() => handleGenerate(report.id)}
                  disabled={generatingId === report.id}
                >
                  {generatingId === report.id ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                  ) : (
                    <><Download className="w-4 h-4 mr-2" /> Generate PDF</>
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
