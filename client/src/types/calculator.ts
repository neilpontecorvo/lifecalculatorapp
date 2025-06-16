export interface Question {
  id: number;
  field: string;
  question: string;
  type: 'number' | 'radio' | 'checkbox' | 'text' | 'select';
  placeholder?: string;
  validation?: string;
  description?: string;
  unit?: string;
  defaultValue?: string;
  options?: {
    value: string;
    label: string;
    description?: string;
    icon?: string;
  }[];
}

export interface UserAnswers {
  [key: string]: string | string[] | number;
}

export interface RiskFactor {
  beta: number;
  hr: number;
  impact: string;
}

export interface RiskFactorCategory {
  [key: string]: RiskFactor;
}

export interface LifeExpectancyBaselines {
  [country: string]: {
    male: number;
    female: number;
  };
}

export interface CalculationResults {
  remainingYears: number;
  expectedAge: number;
  confidenceLow: number;
  confidenceHigh: number;
  remainingHeartbeats: number;
  riskFactors: AnalyzedRiskFactor[];
  recommendations: Recommendation[];
}

export interface AnalyzedRiskFactor {
  factor: string;
  impact: string;
  description: string;
  severity: 'low' | 'moderate' | 'high';
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'low' | 'moderate' | 'high';
  icon: string;
}

export interface AppData {
  lifeExpectancyBaselines: LifeExpectancyBaselines;
  countries?: {
    code: string;
    name: string;
  }[];
  riskFactors: {
    [category: string]: RiskFactorCategory;
  };
  heartbeatConstants: {
    totalLifetimeBeats: number;
    minutesPerYear: number;
  };
  questions: Question[];
}
