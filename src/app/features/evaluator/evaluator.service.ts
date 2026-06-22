import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/core/http/http.service';
<<<<<<< HEAD
import { SendRequestMailToUpdateCountry } from 'src/app/core/models/AnalystVM';
import { AddAssessmentDto, GetAssessmentQuestoinRequestDto, GetAssessmentRequestDto } from 'src/app/core/models/AssessmentRequest';
import { AssessmentWithProgressVM, GetAssessmentQuestionResponseDto, GetAssessmentResponse } from 'src/app/core/models/AssessmentResponse';
import { CountryHistoryDto, GetCountryQuestionHistoryReponseDto, UserCountryRequstDto } from 'src/app/core/models/CountryHistoryDto';
import { CountryVM } from 'src/app/core/models/CountryVM';
import { CompareCountryRequestDto } from 'src/app/core/models/CompareCountryRequestDto';
import { CompareCountryResponseDto } from 'src/app/core/models/CompareCountryResponseDto';
=======
import { SendRequestMailToUpdateCity } from 'src/app/core/models/AnalystVM';
import { AddAssessmentDto, GetAssessmentQuestoinRequestDto, GetAssessmentRequestDto } from 'src/app/core/models/AssessmentRequest';
import { AssessmentWithProgressVM, GetAssessmentQuestionResponseDto, GetAssessmentResponse } from 'src/app/core/models/AssessmentResponse';
import { CityHistoryDto, GetCityQuestionHistoryReponseDto, UserCityRequstDto } from 'src/app/core/models/cityHistoryDto';
import { CityVM } from 'src/app/core/models/CityVM';
import { CompareCityRequestDto } from 'src/app/core/models/CompareCityRequestDto';
import { CompareCityResponseDto } from 'src/app/core/models/CompareCityResponseDto';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { GetAnalyticalLayerRequestDto, GetAnalyticalLayerResultDto, AnalyticalLayerResponseDto } from 'src/app/core/models/GetAnalyticalLayerResultDto';
import { GetUserByRoleRequestDto, GetUserByRoleResponse } from 'src/app/core/models/GetUserByRoleResponse';
import { PaginationUserRequest } from 'src/app/core/models/PaginationRequest';
import { PaginationResponse } from 'src/app/core/models/PaginationResponse';
import { PillarsVM } from 'src/app/core/models/PillersVM';
<<<<<<< HEAD
import { CountryMappingPillerRequestDto } from 'src/app/core/models/QuestionRequest';
import { GetQuestionByCountryMappingRespones } from 'src/app/core/models/QuestonResponse';
=======
import { CityMappingPillerRequestDto } from 'src/app/core/models/QuestionRequest';
import { GetQuestionByCityMappingRespones } from 'src/app/core/models/QuestonResponse';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { ResultResponseDto } from 'src/app/core/models/ResultResponseDto';

@Injectable({
  providedIn: 'root'
})
export class EvaluatorService {

  constructor(private http: HttpService) { }

<<<<<<< HEAD
  public userCountryMappingIDSubject$ = new BehaviorSubject<number | null>(null);

  public sendMailForEditAssessment(data: SendRequestMailToUpdateCountry) {
    return this.http.post(`Auth/sendMailForEditAssessment`, data).pipe(map(x => x as ResultResponseDto<string>));
  }

  public getCountries(request: PaginationUserRequest) {
    return this.http.getWithQueryParams(`Country/countries`, request).pipe(map(x => x as PaginationResponse<CountryVM>));;
  }
  public getAllCountriesByUserId(userId: number) {
    return this.http.get(`Country/getAllCountryByUserId/` + userId).pipe(map(x => x as ResultResponseDto<CountryVM[]>));;
  }
  public getAiAccessCountry(userId: number) {
    return this.http.get(`Country/getAiAccessCountry`).pipe(map(x => x as ResultResponseDto<CountryVM[]>));;
  }
  public getCountryByUserIdForAssessment(userId: number) {
    return this.http.get(`Country/getCountryByUserIdForAssessment/` + userId).pipe(map(x => x as ResultResponseDto<CountryVM[]>));;
  }
  public getCountryHistory(userID: number, updatedAt: string) {
    return this.http.get(`Country/getCountryHistory/` + updatedAt).pipe(map(x => x as ResultResponseDto<CountryHistoryDto>));
  }
  public getEvaluator(request: GetUserByRoleRequestDto) {
    return this.http.getWithQueryParams(`User/GetUserByRoleWithAssignedCountry`, request).pipe(map(x => x as PaginationResponse<GetUserByRoleResponse>));
=======
  public userCityMappingIDSubject$ = new BehaviorSubject<number | null>(null);

  public sendMailForEditAssessment(data: SendRequestMailToUpdateCity) {
    return this.http.post(`Auth/sendMailForEditAssessment`, data).pipe(map(x => x as ResultResponseDto<string>));
  }

  public getCities(request: PaginationUserRequest) {
    return this.http.getWithQueryParams(`City/cities`, request).pipe(map(x => x as PaginationResponse<CityVM>));;
  }
  public getAllCitiesByUserId(userId: number) {
    return this.http.get(`City/getAllCityByUserId/` + userId).pipe(map(x => x as ResultResponseDto<CityVM[]>));;
  }
  public getAiAccessCity(userId: number) {
    return this.http.get(`City/getAiAccessCity`).pipe(map(x => x as ResultResponseDto<CityVM[]>));;
  }
  public getCityByUserIdForAssessment(userId: number) {
    return this.http.get(`City/getCityByUserIdForAssessment/` + userId).pipe(map(x => x as ResultResponseDto<CityVM[]>));;
  }
  public getCityHistory(userID: number, updatedAt: string) {
    return this.http.get(`City/getCityHistory/` + updatedAt).pipe(map(x => x as ResultResponseDto<CityHistoryDto>));
  }
  public getEvaluator(request: GetUserByRoleRequestDto) {
    return this.http.getWithQueryParams(`User/GetUserByRoleWithAssignedCity`, request).pipe(map(x => x as PaginationResponse<GetUserByRoleResponse>));
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }

  public getAllPillars() {
    return this.http.get(`Pillar/Pillars`).pipe(map(x => x as PillarsVM[]));
  }

  public saveAssessment(payload: AddAssessmentDto) {
    return this.http.post(`AssessmentResponse/saveAssessment`, payload).pipe(map(x => x as ResultResponseDto<string>));
  }
  public getAssessmentResults(payload: GetAssessmentRequestDto) {
    return this.http.getWithQueryParams(`AssessmentResponse/getAssessmentResults`, payload).pipe(map(x => x as PaginationResponse<GetAssessmentResponse>));
  }
  public getAssessmentQuestoins(payload: GetAssessmentQuestoinRequestDto) {
    return this.http.getWithQueryParams(`AssessmentResponse/getAssessmentQuestoins`, payload).pipe(map(x => x as PaginationResponse<GetAssessmentQuestionResponseDto>));
  }
  public ImportAssessment(formData: FormData) {
    return this.http.UploadFile(`AssessmentResponse/ImportAssessment`, formData).pipe(map(x => x as ResultResponseDto<string>));;
  }
  public getAssessmentProgressHistory(assessmentID: number) {
    return this.http.get(`AssessmentResponse/getAssessmentProgressHistory/` + assessmentID).pipe(map(x => x as ResultResponseDto<AssessmentWithProgressVM>));
  }
<<<<<<< HEAD
  public getCountryQuestionHistory(request: UserCountryRequstDto) {
    return this.http.getWithQueryParams(`AssessmentResponse/getCountryQuestionHistory`, request).pipe(map(x => x as GetCountryQuestionHistoryReponseDto));
  }
  public getQuestionsByCountryId(payload: CountryMappingPillerRequestDto) {
    return this.http.getWithQueryParams(`Question/getQuestionsByCountryMappingId`, payload).pipe(map(x => x as ResultResponseDto<GetQuestionByCountryMappingRespones>));
  }
  public ExportQuestions(userCountryMappingID: number) {
    return this.http.ImportFile(`Question/ExportAssessment/` + userCountryMappingID);
=======
  public getCityQuestionHistory(request: UserCityRequstDto) {
    return this.http.getWithQueryParams(`AssessmentResponse/getCityQuestionHistory`, request).pipe(map(x => x as GetCityQuestionHistoryReponseDto));
  }
  public getQuestionsByCityId(payload: CityMappingPillerRequestDto) {
    return this.http.getWithQueryParams(`Question/getQuestionsByCityMappingId`, payload).pipe(map(x => x as ResultResponseDto<GetQuestionByCityMappingRespones>));
  }
  public ExportQuestions(userCityMappingID: number) {
    return this.http.ImportFile(`Question/ExportAssessment/` + userCityMappingID);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  public GetAnalyticalLayerResults(request: GetAnalyticalLayerRequestDto) {
    return this.http.getWithQueryParams(`Kpi/GetAnalyticalLayerResults`, request).pipe(map(x => x as PaginationResponse<GetAnalyticalLayerResultDto>));;
  }
  public GetAllKpi() {
    return this.http.get(`Kpi/GetAllKpi`).pipe(map(x => x as ResultResponseDto<AnalyticalLayerResponseDto[]>));;
  }
<<<<<<< HEAD
  public compareCountries(request: CompareCountryRequestDto) {
    return this.http.post(`Kpi/compareCountries`, request).pipe(map(x => x as ResultResponseDto<CompareCountryResponseDto>));
=======
  public compareCities(request: CompareCityRequestDto) {
    return this.http.post(`Kpi/compareCities`, request).pipe(map(x => x as ResultResponseDto<CompareCityResponseDto>));
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
}
