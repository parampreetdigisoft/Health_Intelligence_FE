export interface AIEstimatedQuestionScoreDto {
<<<<<<< HEAD
  countryId: number;
=======
  cityId: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pillarId: number;
  questionId: number;

  questionText: string;
  dataYear: number;

  aiScore: number | null;
  aiProgress: number | null;
  evaluatorProgress: number | null;
  discrepancy: number | null;

  confidenceLevel: string | null;
  dataSourcesUsed: number | null;

  evidenceSummary: string | null;
  redFlags: string | null;
  geographicEquityNote: string | null;

  sourceType: string | null;
  sourceName: string | null;
  sourceURL: string | null;
  sourceDataYear: number | null;
  sourceDataExtract: string | null;
  sourceTrustLevel: number | null;
  updatedAt: Date;
}
