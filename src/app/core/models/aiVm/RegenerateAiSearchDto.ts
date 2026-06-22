export class RegenerateAiSearchDto {
  countryID!: number;
  countryEnable = false;
  pillarEnable = false;
  questionEnable = false;
  viewerUserIDs: number[] = [];
  regenerateMissingQuestionsEnable = false;
  immediateSummaryEnable = false;
}
export class RegeneratePilalrAiSearchDto  extends RegenerateAiSearchDto{
  pillarID!: number;
}
