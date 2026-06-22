import { GetCountrySubmitionHistoryReponseDto } from "./AssessmentResponse";


export interface CountryHistoryDto {
  totalCountry: number;
  totalAnalyst: number;
  totalEvaluator: number;
  activeCountry: number;
  totalAccessCountry: number;
  compeleteCountry: number;
  inprocessCountry: number;
  avgHighScore: number;
  avgLowerScore: number;
  overallVitalityScore: number;
  finalizeCountry: number;
  unFinalize: number;
}
export interface GetCountryQuestionHistoryReponseDto
  extends GetCountrySubmitionHistoryReponseDto {
  pillars: CountryPillarQuestionHistoryReponseDto[];
}

export interface CountryPillarQuestionHistoryReponseDto  {
  pillarID: number;
  pillarName: string;
  score: number;
  scoreProgress: number;
  ansPillar: number;
  totalQuestion: number;
  ansQuestion: number;
  imagePath: string;
  isAccess: boolean;
}

export interface GetCountriesSubmitionHistoryReponseDto
  extends GetCountrySubmitionHistoryReponseDto {
  countryName: string;
}
export interface CountryPillarHistoryReponseDto
  extends CountryPillarQuestionHistoryReponseDto {
  userID: number;
  fullName: string;
}

export interface UserCountryRequstDto extends UserCountryPillarDashboardRequstDto {
  userID: number;
}

export interface UserCountryPillarDashboardRequstDto {
  countryID: number;
  updatedAt: string;
}
