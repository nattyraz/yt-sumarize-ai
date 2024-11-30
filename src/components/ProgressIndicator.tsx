import React from 'react';

interface ProgressIndicatorProps {
  status: 'idle' | 'processing' | 'completed' | 'error';
}

export function ProgressIndicator({ status }: ProgressIndicatorProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'processing':
        return 'Processing video...';
      case 'completed':
        return 'Analysis complete';
      case 'error':
        return 'Error processing video';
      default:
        return 'Ready to analyze';
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${getStatusColor()}`}
          style={{
            width: status === 'completed' ? '100%' : status === 'processing' ? '60%' : '0%',
          }}
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-600">{getStatusText()}</p>
    </div>
  );
}