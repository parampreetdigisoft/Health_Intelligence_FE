export interface EmergingTrendCountryCard {
  country: string;
  region: string;
  type: 'risk' | 'trend';
  title: string;
  summary: string;
  category: string;
  status: string;
  urgency: string;
  confidence: number;
  icon: string;
  color: string;
  sourceUrl: string; 
  countryCode?: string;
}

export interface ChatEmergingTrendsResponse {
  updatedAt: string;
  headline: string;
  subHeadline: string;
  countries: EmergingTrendCountryCard[];
}
