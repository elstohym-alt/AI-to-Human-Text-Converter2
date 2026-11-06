export type HumanizeMode = 
  | 'stealth_zero_gpt' 
  | 'fast'
  | 'academic' 
  | 'standard' 
  | 'casual' 
  | 'formal' 
  | 'creative';

export type ReadabilityLevel = 'general' | 'high_school' | 'college' | 'expert';

export interface SentenceAnalysis {
  sentence: string;
  aiProbability: number;
  status: 'human' | 'mixed' | 'ai';
}

export interface DetectResponse {
  aiPercentage: number;
  humanPercentage: number;
  isHuman: boolean;
  burstinessScore: number;
  perplexityScore: number;
  sentenceAnalysis: SentenceAnalysis[];
  verdict: string;
  benchmarks: {
    zeroGpt: string;
    turnitin: string;
    gptZero: string;
    copyleaks: string;
    winstonAi: string;
  };
}

export interface HumanizeResponse {
  success: boolean;
  humanizedText: string;
  originalText: string;
  stats: {
    originalWordCount: number;
    humanizedWordCount: number;
    originalCharCount: number;
    humanizedCharCount: number;
    zeroGptAiScore: number;
    humanScore: number;
    readabilityGrade: string;
  };
  error?: string;
  details?: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  mode: HumanizeMode;
  originalText: string;
  humanizedText: string;
  wordCount: number;
  zeroGptAiScore: number;
}
