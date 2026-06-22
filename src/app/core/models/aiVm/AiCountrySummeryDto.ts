export interface AiCountrySummeryDto {
  countryID: number;
  continent: string;
  countryName: string;
  region: string;
  image: string | null;
  scoringYear: number;
  aiScore: number | null;
  aiProgress: number | null;
  evaluatorProgress: number | null;
  discrepancy: number | null;
  confidenceLevel: string;
  evidenceSummary: string;
  crossPillarPatterns: string;
  institutionalCapacity: string;
  equityAssessment: string;
  sustainabilityOutlook: string;
  strategicRecommendations: string;
  dataTransparencyNote: string;
  updatedAt:Date;
  isVerified:boolean;
  comment?:string;
  aiCompletionRate?:number;
}
