export class RegenerateAiSearchDto {
<<<<<<< HEAD
  countryID!: number;
  countryEnable = false;
=======
  cityID!: number;
  cityEnable = false;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pillarEnable = false;
  questionEnable = false;
  viewerUserIDs: number[] = [];
  regenerateMissingQuestionsEnable = false;
  immediateSummaryEnable = false;
}
export class RegeneratePilalrAiSearchDto  extends RegenerateAiSearchDto{
  pillarID!: number;
}
