import { map, Subject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { CountryVM } from '../../core/models/CountryVM';
=======
import { CityVM } from '../../core/models/CityVM';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { PillarsVM } from 'src/app/core/models/PillersVM';
import { HttpService } from 'src/app/core/http/http.service';
import { UserService } from 'src/app/core/services/user.service';
import { ResultResponseDto } from 'src/app/core/models/ResultResponseDto';
<<<<<<< HEAD

import { PaginationRequest, PaginationUserRequest } from 'src/app/core/models/PaginationRequest';
import { PaginationResponse } from 'src/app/core/models/PaginationResponse';

import { GetAssignUserDto, PublicUserResponse } from 'src/app/core/models/UserInfo';
import { PillarsHistoryResponse } from 'src/app/core/models/PillarsUserHistoryResponse';
import { InviteBulkUserDto, InviteUserDto, UpdateInviteUserDto } from '../../core/models/AnalystVM';
import {  CountryHistoryDto, UserCountryPillarDashboardRequstDto } from '../../core/models/CountryHistoryDto';
import { QuestionsByUserPillarsResponsetDto } from 'src/app/core/models/GetQuestionHistoryResponseDto ';

=======
import { CityPillerRequestDto } from 'src/app/core/models/QuestionRequest';
import { PaginationRequest, PaginationUserRequest } from 'src/app/core/models/PaginationRequest';
import { PaginationResponse } from 'src/app/core/models/PaginationResponse';
import { CompareCityRequestDto } from 'src/app/core/models/CompareCityRequestDto';
import { CompareCityResponseDto } from 'src/app/core/models/CompareCityResponseDto';
import { GetAssignUserDto, PublicUserResponse } from 'src/app/core/models/UserInfo';
import { PillarsHistoryResponse } from 'src/app/core/models/PillarsUserHistoryResponse';
import { InviteBulkUserDto, InviteUserDto, UpdateInviteUserDto } from '../../core/models/AnalystVM';
import { CityHistoryDto, UserCityPillarDashboardRequstDto } from '../../core/models/cityHistoryDto';
import { QuestionsByUserPillarsResponsetDto } from 'src/app/core/models/GetQuestionHistoryResponseDto ';
import { AiCityPillarDashboardResponseDto } from 'src/app/core/models/AiCityPillarDashboardResponseDto';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { GetUserByRoleRequestDto, GetUserByRoleResponse } from '../../core/models/GetUserByRoleResponse';
import { AddBulkQuestionsDto, AddQuestionRequest, GetQuestionRequest, GetQuestionResponse } from 'src/app/core/models/QuestonResponse';
import { AssessmentWithProgressVM, GetAssessmentQuestionResponseDto, GetAssessmentResponse } from 'src/app/core/models/AssessmentResponse';
import { AnalyticalLayerResponseDto, GetAnalyticalLayerRequestDto, GetAnalyticalLayerResultDto } from 'src/app/core/models/GetAnalyticalLayerResultDto';
<<<<<<< HEAD
import { ChangeAssessmentStatusRequestDto, GetAssessmentQuestoinRequestDto, GetAssessmentRequestDto, GetCountryPillarHistoryRequestDto, GetCountryPillarHistoryRequestNewDto, TransferAssessmentRequestDto } from 'src/app/core/models/AssessmentRequest';
import { GetMutiplekpiLayerRequestDto } from 'src/app/core/models/aiVm/GetMutiplekpiLayerRequestDto';
import { GetMutiplekpiLayerResultsDto } from 'src/app/core/models/aiVm/GetMutiplekpiLayerResultsDto';
import { BlogVM } from 'src/app/core/models/blog/blogVM';
import { ExportCountryWithOptionDto } from 'src/app/core/models/ExportCountryWithOptionDto';
import { CountryPillerRequestDto } from 'src/app/core/models/QuestionRequest';
import { AiCountryPillarDashboardResponseDto } from 'src/app/core/models/AiCountryPillarDashboardResponseDto';
import { CompareCountryRequestDto } from 'src/app/core/models/CompareCountryRequestDto';
import { CompareCountryResponseDto } from 'src/app/core/models/CompareCountryResponseDto';

=======
import { ChangeAssessmentStatusRequestDto, GetAssessmentQuestoinRequestDto, GetAssessmentRequestDto, GetCityPillarHistoryRequestDto, GetCityPillarHistoryRequestNewDto, TransferAssessmentRequestDto } from 'src/app/core/models/AssessmentRequest';
import { GetMutiplekpiLayerRequestDto } from 'src/app/core/models/aiVm/GetMutiplekpiLayerRequestDto';
import { GetMutiplekpiLayerResultsDto } from 'src/app/core/models/aiVm/GetMutiplekpiLayerResultsDto';
import { BlogVM } from 'src/app/core/models/blog/blogVM';
import { ExportCityWithOptionDto } from 'src/app/core/models/ExportCityWithOptionDto';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

@Injectable({
  providedIn: "root",
})
export class AdminService {
  public errorMessage: Subject<any> = new Subject<any>();

  constructor(private http: HttpService, private userService: UserService) { }

  public login(email: string, password: string) {
    const data = JSON.stringify({ email, password });
    return this.http.post(`Auth/login`, data).pipe(
      tap((user: any) => {
        if (user) this.userService.userInfo = user;
      })
    );
  }

<<<<<<< HEAD
  public getCountries(request: PaginationUserRequest) {
    return this.http
      .getWithQueryParams(`Country/countries`, request)
      .pipe(map((x) => x as PaginationResponse<CountryVM>));
  }
  public getAllCountriesByUserId(userId: number) {
    return this.http
      .get(`Country/getAllCountryByUserId/` + userId)
      .pipe(map((x) => x as ResultResponseDto<CountryVM[]>));
  }

  public addBulkCountry(data: any) {
    return this.http
      .post(`Country/addBulkCountry`, data)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public AddUpdateCountry(formdata: FormData) {
    return this.http
      .UploadFile(`Country/AddUpdateCountry`, formdata)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }

  public editCountry(id: number, data: any) {
    return this.http
      .put(`Country/edit/` + id, data)
      .pipe(map((x) => x as ResultResponseDto<CountryVM>));
  }

  public deleteCountry(id: number) {
    return this.http
      .delete(`Country/delete/` + id)
      .pipe(map((x) => x as ResultResponseDto<boolean>));
  }
  public getCountryHistory(userID: number, updatedAt: string) {
    return this.http
      .get(`Country/getCountryHistory/` + updatedAt)
      .pipe(map((x) => x as ResultResponseDto<CountryHistoryDto>));
  }
  public exportCountries(request:ExportCountryWithOptionDto) {
    return this.http.ImportFile(`Country/exportCountries`,request);
=======
  public getCities(request: PaginationUserRequest) {
    return this.http
      .getWithQueryParams(`City/cities`, request)
      .pipe(map((x) => x as PaginationResponse<CityVM>));
  }
  public getAllCitiesByUserId(userId: number) {
    return this.http
      .get(`City/getAllCityByUserId/` + userId)
      .pipe(map((x) => x as ResultResponseDto<CityVM[]>));
  }

  public addBulkCity(data: any) {
    return this.http
      .post(`City/addBulkCity`, data)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public AddUpdateCity(formdata: FormData) {
    return this.http
      .UploadFile(`City/AddUpdateCity`, formdata)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }

  public editCity(id: number, data: any) {
    return this.http
      .put(`City/edit/` + id, data)
      .pipe(map((x) => x as ResultResponseDto<CityVM>));
  }

  public deleteCity(id: number) {
    return this.http
      .delete(`City/delete/` + id)
      .pipe(map((x) => x as ResultResponseDto<boolean>));
  }
  public getCityHistory(userID: number, updatedAt: string) {
    return this.http
      .get(`City/getCityHistory/` + updatedAt)
      .pipe(map((x) => x as ResultResponseDto<CityHistoryDto>));
  }
  public exportCities(request:ExportCityWithOptionDto) {
    return this.http.ImportFile(`City/exportCities`,request);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }

  public getAnalyst(request: GetUserByRoleRequestDto) {
    return this.http
<<<<<<< HEAD
      .getWithQueryParams(`User/GetUserByRoleWithAssignedCountry`, request)
=======
      .getWithQueryParams(`User/GetUserByRoleWithAssignedCity`, request)
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      .pipe(map((x) => x as PaginationResponse<GetUserByRoleResponse>));
  }
  public addAnalyst(data: InviteUserDto) {
    return this.http
      .post(`Auth/InviteUser`, data)
      .pipe(map((x) => x as ResultResponseDto<unknown>));
  }
  public addBulkAnalyst(data: InviteBulkUserDto) {
    return this.http
      .post(`Auth/InviteBulkUser`, data)
      .pipe(map((x) => x as ResultResponseDto<unknown>));
  }
  public editAnalyst(data: UpdateInviteUserDto) {
    return this.http
      .post(`Auth/UpdateInviteUser`, data)
      .pipe(map((x) => x as ResultResponseDto<unknown>));
  }
  public deleteUser(id: number) {
    return this.http
      .delete(`Auth/deleteUser/` + id)
      .pipe(map((x) => x as ResultResponseDto<unknown>));
  }
  public getAllPillars() {
    return this.http.get(`Pillar/Pillars`).pipe(map((x) => x as PillarsVM[]));
  }
  public editAllPillars(id: number, data: PillarsVM) {
    return this.http.put(`Pillar/` + id, data).pipe(map((x) => x as PillarsVM));
  }
<<<<<<< HEAD
  public getResponsesByUserId(request: GetCountryPillarHistoryRequestNewDto) {
    return this.http.post(`Pillar/GetResponsesByUserId`, request).pipe(map(x => x as PaginationResponse<PillarsHistoryResponse>));
  }
  public getPillarsHistoryByUserId(request: GetCountryPillarHistoryRequestDto) {
=======
  public getResponsesByUserId(request: GetCityPillarHistoryRequestNewDto) {
    return this.http.post(`Pillar/GetResponsesByUserId`, request).pipe(map(x => x as PaginationResponse<PillarsHistoryResponse>));
  }
  public getPillarsHistoryByUserId(request: GetCityPillarHistoryRequestDto) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    return this.http
      .post(`Pillar/GetPillarsHistoryByUserId`, request)
      .pipe(map((x) => x as ResultResponseDto<PillarsHistoryResponse[]>));
  }
<<<<<<< HEAD
  public exportPillarsHistoryByUserId(request: GetCountryPillarHistoryRequestDto) {
=======
  public exportPillarsHistoryByUserId(request: GetCityPillarHistoryRequestDto) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    return this.http.ImportFile(`Pillar/ExportPillarsHistoryByUserId`, request);
  }
  public getQuestions(data: GetQuestionRequest) {
    return this.http
      .getWithQueryParams(`Question/getQuestions`, data)
      .pipe(map((x) => x as PaginationResponse<GetQuestionResponse>));
  }

  public addUpdateQuestion(data: AddQuestionRequest) {
    return this.http
      .post(`Question/addUpdateQuestion`, data)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public addBulkQuestions(data: AddBulkQuestionsDto) {
    return this.http
      .post(`Question/addBulkQuestions`, data)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public deleteQuestion(id: number) {
    return this.http
      .delete(`Question/delete/` + id)
      .pipe(map((x) => x as boolean));
  }
<<<<<<< HEAD
  public getQuestionsHistoryByPillar(request: GetCountryPillarHistoryRequestDto) {
=======
  public getQuestionsHistoryByPillar(request: GetCityPillarHistoryRequestDto) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    return this.http
      .getWithQueryParams(`Question/getQuestionsHistoryByPillar`, request)
      .pipe(
        map((x) => x as ResultResponseDto<QuestionsByUserPillarsResponsetDto[]>)
      );
  }
<<<<<<< HEAD
  public saveAssessment(payload: CountryPillerRequestDto) {
=======
  public saveAssessment(payload: CityPillerRequestDto) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    return this.http
      .post(`AssessmentResponse/saveAssessment`, payload)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public getAssessmentResults(payload: GetAssessmentRequestDto) {
    return this.http
      .getWithQueryParams(`AssessmentResponse/getAssessmentResults`, payload)
      .pipe(map((x) => x as PaginationResponse<GetAssessmentResponse>));
  }
  public getAssessmentQuestoins(payload: GetAssessmentQuestoinRequestDto) {
    return this.http
      .getWithQueryParams(`AssessmentResponse/getAssessmentQuestoins`, payload)
      .pipe(
        map((x) => x as PaginationResponse<GetAssessmentQuestionResponseDto>)
      );
  }
  public getAssessmentProgressHistory(assessmentID: number) {
    return this.http
      .get(`AssessmentResponse/getAssessmentProgressHistory/` + assessmentID)
      .pipe(map((x) => x as ResultResponseDto<AssessmentWithProgressVM>));
  }

<<<<<<< HEAD
  public getCountryPillarHistory(request: UserCountryPillarDashboardRequstDto) {
    return this.http.getWithQueryParams(`AssessmentResponse/getCountryPillarHistory`, request).pipe(map(x => x as ResultResponseDto<AiCountryPillarDashboardResponseDto>));
=======
  public getCityPillarHistory(request: UserCityPillarDashboardRequstDto) {
    return this.http.getWithQueryParams(`AssessmentResponse/getCityPillarHistory`, request).pipe(map(x => x as ResultResponseDto<AiCityPillarDashboardResponseDto>));
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  public changeAssessmentStatus(request: ChangeAssessmentStatusRequestDto) {
    return this.http
      .post(`AssessmentResponse/changeAssessmentStatus`, request)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public transferAssessment(request: TransferAssessmentRequestDto) {
    return this.http
      .post(`AssessmentResponse/transferAssessment`, request)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
<<<<<<< HEAD
  public getUsersAssignedToCountry(countryID: number) {
    return this.http
      .get(`User/getUsersAssignedToCountry/` + countryID)
=======
  public getUsersAssignedToCity(cityID: number) {
    return this.http
      .get(`User/getUsersAssignedToCity/` + cityID)
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      .pipe(map((x) => x as ResultResponseDto<GetAssessmentResponse[]>));
  }
  public GetEvaluatorByAnalyst(payload: GetAssignUserDto) {
    return this.http
      .getWithQueryParams(`User/GetEvaluatorByAnalyst`, payload)
      .pipe(map((x) => x as ResultResponseDto<PublicUserResponse[]>));
  }
  public GetAnalyticalLayerResults(request: GetAnalyticalLayerRequestDto) {
    return this.http
      .getWithQueryParams(`Kpi/GetAnalyticalLayerResults`, request)
      .pipe(map((x) => x as PaginationResponse<GetAnalyticalLayerResultDto>));
  }
  public GetAllKpi() {
    return this.http
      .get(`Kpi/GetAllKpi`)
      .pipe(map((x) => x as ResultResponseDto<AnalyticalLayerResponseDto[]>));
  }
<<<<<<< HEAD
  public compareCountries(request: CompareCountryRequestDto) {
    return this.http.post(`Kpi/compareCountries`, request).pipe(map(x => x as ResultResponseDto<CompareCountryResponseDto>));
=======
  public compareCities(request: CompareCityRequestDto) {
    return this.http.post(`Kpi/compareCities`, request).pipe(map(x => x as ResultResponseDto<CompareCityResponseDto>));
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  public getMutiplekpiLayerResults(payload: GetMutiplekpiLayerRequestDto) {
    return this.http.post(`kpi/getMutiplekpiLayerResults`, payload).pipe(map(x => x as ResultResponseDto<GetMutiplekpiLayerResultsDto>));;
  }

  public getBlogs(payload: PaginationRequest) {
    return this.http.getWithQueryParams(`blog/getBlogs`, payload).pipe(map(x => x as PaginationResponse<BlogVM>));;
  }
  public deleteBlog(id: number) {
    return this.http.delete(`blog/deleteBlog/${id}`,null).pipe(map(x => x as ResultResponseDto<boolean>));;
  }
  public addUpdateBlog(formdata: FormData) {
    return this.http.UploadFile(`blog/addUpdateBlog`, formdata).pipe(map(x => x as ResultResponseDto<boolean>));;
  }
<<<<<<< HEAD
  public exportCompareCountries(params: any) {
    return this.http.ImportFile(`kpi/ExportCompareCountries`, params);
=======
  public exportCompareCities(params: any) {
    return this.http.ImportFile(`kpi/ExportCompareCities`, params);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
}
