import React, { useState } from 'react';
import { VideoAnalysis } from '../types';

interface AnalysisTabsProps {
  analysis: VideoAnalysis;
  onExport: () => void;
}

export function AnalysisTabs({ analysis, onExport }: AnalysisTabsProps) {
  const [activeTab, setActiveTab] = useState<'transcription' | 'summary'>('transcription');

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <nav className="flex" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('transcription')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'transcription'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Transcription
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'summary'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Summary
          </button>
        </nav>
      </div>
      <div className="p-4">
        {activeTab === 'transcription' && (
          <div className="prose max-w-none">
            <p>{analysis.transcription || 'No transcription available'}</p>
          </div>
        )}
        {activeTab === 'summary' && (
          <div className="prose max-w-none">
            <p>{analysis.summary || 'No summary available'}</p>
          </div>
        )}
        <button
          onClick={onExport}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Export as Text
        </button>
      </div>
    </div>
  );
}