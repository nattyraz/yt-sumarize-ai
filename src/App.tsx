import React, { useState } from 'react';
import { VideoInput } from './components/VideoInput';
import { ProgressIndicator } from './components/ProgressIndicator';
import { AnalysisTabs } from './components/AnalysisTabs';
import { VideoAnalysis } from './types';
import { extractVideoId } from './utils/validation';

function App() {
  const [analysis, setAnalysis] = useState<VideoAnalysis>({
    videoId: '',
    status: 'idle',
  });

  const handleSubmit = async (url: string) => {
    const videoId = extractVideoId(url);
    if (!videoId) return;

    setAnalysis({
      videoId,
      status: 'processing',
    });

    // Simulate processing
    setTimeout(() => {
      setAnalysis({
        videoId,
        status: 'completed',
        transcription: 'This is a sample transcription of the video content...',
        summary: 'This is a sample summary of the video content...',
      });
    }, 3000);
  };

  const handleExport = () => {
    if (!analysis.transcription && !analysis.summary) return;

    const content = `
Video Analysis Export
--------------------
Video ID: ${analysis.videoId}

Transcription:
${analysis.transcription}

Summary:
${analysis.summary}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `video-analysis-${analysis.videoId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          YouTube Video Analysis
        </h1>
        
        <VideoInput
          onSubmit={handleSubmit}
          isProcessing={analysis.status === 'processing'}
        />
        
        <ProgressIndicator status={analysis.status} />
        
        {analysis.status === 'completed' && (
          <AnalysisTabs
            analysis={analysis}
            onExport={handleExport}
          />
        )}
      </div>
    </div>
  );
}

export default App;