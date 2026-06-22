import { AssessmentPhase } from "../enums/AssessmentPhase";
import { UserRoleValue } from "../enums/UserRole";
import { PaginationUserRequest } from "./PaginationRequest";


export interface AddAssessmentDto {
  assessmentID: number;
<<<<<<< HEAD
  userCountryMappingID: number;
=======
  userCityMappingID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pillarID: number;
  responses: AddAssessmentResponseDto[];
  isAutoSave:boolean;
  isFinalized:boolean;
}

export interface AddAssessmentResponseDto {
  responseID: number;
  assessmentID: number;
  questionID: number;
  questionOptionID: number;
  score?: number | null;
  justification: string;
}

export interface GetAssessmentQuestoinRequestDto extends PaginationUserRequest{
  pillarID?: number | null;
  assessmentID: number;
}


export interface GetAssessmentRequestDto extends PaginationUserRequest{
  subUserID?: number | null;
<<<<<<< HEAD
  countryID?: number | null;
=======
  cityID?: number | null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  role?: UserRoleValue | null;
  updatedAt?: string;
}


<<<<<<< HEAD
export interface GetCountryPillarHistoryRequestDto {
  countryID: number;
=======
export interface GetCityPillarHistoryRequestDto {
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  userID: number;
  pillarID?: number;
  updatedAt:string;
  exportType?:string
}
<<<<<<< HEAD
export interface GetCountryPillarHistoryRequestNewDto extends PaginationUserRequest {
  countryID: number;
=======
export interface GetCityPillarHistoryRequestNewDto extends PaginationUserRequest {
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pillarID?: number;
  updatedAt:string;
}
export interface ChangeAssessmentStatusRequestDto {
  assessmentID: number;
  userID: number;
  assessmentPhase?: AssessmentPhase;
}
export interface TransferAssessmentRequestDto {
  assessmentID: number;
  transferToUserID: number;
}
