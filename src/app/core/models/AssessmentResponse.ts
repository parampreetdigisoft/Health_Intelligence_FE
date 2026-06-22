import { AssessmentPhase } from "../enums/AssessmentPhase";

export interface GetAssessmentResponse {
  assessmentID:number;
<<<<<<< HEAD
  userCountryMappingID:number
  createdAt:Date | string;
  countryID: number;
  continent: string;
  countryName: string;
=======
  userCityMappingID:number
  createdAt:Date | string;
  cityID: number;
  state: string;
  cityName: string;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  isActive: boolean;
  userID: number;
  userName: string;
  score?: number |null;   // float in C# maps to number in TS
  assignedByUser: string;
  assignedByUserId: number;
  assessmentPhase?:AssessmentPhase;
  assessmentYear: number;
  totalUnknown?: number;
  totalNA?: number;
}

export interface GetAssessmentQuestionResponseDto {
  assessmentID: number;
  userID: number;
  pillerID: number;
  pillarName:string;
  questoinID: number;  // keeping same spelling as C#; can rename to questionID if desired
  questionText: string;
  questionOptionText: string;
  justification: string;
  source: string;
  score: number | null;   // nullable enum
  showComment?: boolean;
  showSource?: boolean;
}

export interface AssessmentWithProgressVM {
  assessmentID: number;
  score: number;
  totalAnsPillar: number;
  totalQuestion: number;
  totalAnsQuestion: number;
  currentProgress:number
}

<<<<<<< HEAD
export interface GetCountrySubmitionHistoryReponseDto {
  countryID: number;
=======
export interface GetCitySubmitionHistoryReponseDto {
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  totalAssessment: number;
  score: number;
  aiScore: number;
  scoreProgress: number;
  totalPillar: number;
  totalAnsPillar: number;
  totalQuestion: number;
  ansQuestion: number;
}

