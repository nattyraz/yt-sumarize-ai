export interface VideoAnalysis {
  videoId: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  transcription?: string;
  summary?: string;
  error?: string;
}

export interface AnalysisState {
  currentVideo: VideoAnalysis | null;
  history: VideoAnalysis[];
}