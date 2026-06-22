import { PaginationRequest } from "./PaginationRequest";

export interface GetQuestionRequest extends PaginationRequest {
  pillarID?: number;
}
<<<<<<< HEAD
export interface GetQuestionByCountryMappingRespones {
  assessmentID: number;
  userCountryMappingID: number;
=======
export interface GetQuestionByCityMappingRespones {
  assessmentID: number;
  userCityMappingID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  displayOrder: number;
  submittedPillarDisplayOrder: number;
  pillarID: number;
  pillarName: string;
  description: string;
  questions:AssessmentQuestionResponse[];
}

<<<<<<< HEAD
export interface GetQuestionByCountryRespones extends GetQuestionResponse {
=======
export interface GetQuestionByCityRespones extends GetQuestionResponse {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  assessmentID: number;
  pillarDisplayOrder: number;
}

export interface GetQuestionResponse extends AddQuestionRequest {
  displayOrder: number;
  pillarName: string;
}

export interface QuestionOption {
  optionID: number;
  questionID: number;
  optionText: string;
  scoreValue?: number;
  displayOrder?: number;
}

export interface AddQuestionRequest {
  questionID: number;
  pillarID: number;
  questionText: string;
  questionOptions: QuestionOption[];
}
export interface AddBulkQuestionsDto {
  questions: AddQuestionRequest[]
}

export interface AssessmentQuestionResponse {
  questionID: number;
  pillarID: number;
  responseID: number;
  questionText: string;
  isSelected: boolean;
  questionOptions: AssessmentQuestionOptionResonse[];
  history: HistoryQuestionAnswerRawDto[];
}

export interface AssessmentQuestionOptionResonse  extends QuestionOption {
  isSelected: boolean;
  justification:string
  source:string
}

export interface HistoryQuestionAnswerRawDto  extends AssessmentQuestionOptionResonse {
  fullName:string
  userID:number
}