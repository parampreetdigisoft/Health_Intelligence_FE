<<<<<<< HEAD
export interface EmergingTrendCountryCard {
=======
export interface EmergingTrendCityCard {
  city: string;
  cityCode: string;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
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
<<<<<<< HEAD
  sourceUrl: string; 
  countryCode?: string;
=======
  sourceUrl: string;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}

export interface ChatEmergingTrendsResponse {
  updatedAt: string;
  headline: string;
  subHeadline: string;
<<<<<<< HEAD
  countries: EmergingTrendCountryCard[];
=======
  cities: EmergingTrendCityCard[];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}
