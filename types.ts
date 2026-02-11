export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  provider: 'google' | 'github';
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  lastUpdated: string;
  isPrivate: boolean;
}

export enum AnalysisType {
  BASIC = 'BASIC', // 5000 KZ
  PREMIUM = 'PREMIUM' // 8000 KZ (Fix included)
}

export interface Metric {
  label: string;
  value: number;
  max: number;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

export type IssueSeverity = 'critical' | 'major' | 'minor';
export type IssueType = 'bug' | 'vulnerability' | 'code_smell';

export interface Issue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  message: string;
  file: string;
  line: number;
}

export interface AnalysisResult {
  securityScore: number;
  maintainabilityScore: number;
  reliabilityScore: number;
  technicalDebtRatio: number; // Percentage
  bugsCount: number;
  vulnerabilitiesCount: number;
  codeSmellsCount: number;
  duplications: number; // Percentage
  summary: string;
  recommendations: string[];
  suggestedFixes?: string; // Only for Premium
  chartData: Array<{ name: string; score: number; fullMark: number }>;
  issues: Issue[]; // New detailed list
}

export interface PaymentState {
  status: 'idle' | 'processing' | 'success' | 'failed';
  amount: number;
  reference: string;
}

export type AppView = 'repos' | 'history' | 'billing';