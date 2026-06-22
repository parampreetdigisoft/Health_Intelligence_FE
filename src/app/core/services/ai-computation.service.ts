import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs';
<<<<<<< HEAD
import { AiCountrySummeryDto } from '../models/aiVm/AiCountrySummeryDto';


import { ResultResponseDto } from '../models/ResultResponseDto';
import { AITrustLevelVM } from '../models/aiVm/AITrustLevelVM';
import { AIEstimatedQuestionScoreDto } from '../models/aiVm/AIEstimatedQuestionScoreDto';


import { RegenerateAiSearchDto } from '../models/aiVm/RegenerateAiSearchDto';

import { DownloadReportDto } from '../models/aiVm/downloadReportDto';
import { AITransferAssessmentRequestDto } from '../models/aiVm/AITransferAssessmentRequestDto';
import { PaginationResponse } from '../models/PaginationResponse';
import { AiCountryDocumentRequestDto, AiCountryPillarDocumentRequestDto, AiCountrySummeryRequestDto, AiPillarQuetionsRequestDto, DeleteCountryDocumentRequestDto } from '../models/aiVm/AiCountrySummeryRequestDto';
import { AiCountrySummeryRequestPdfDto } from '../models/aiVm/AiCountrySummeryRequestPdfDto';
import { AiCountryPillarResponseDto } from '../models/aiVm/AiCountryPillarResponseDto';
import { AiCrossCountryResponseDto } from '../models/aiVm/AiCrossCountryResponseDto';
import { ChangedAiCountryEvaluationStatusDto } from '../models/aiVm/ChangedAiCountryEvaluationStatusDto';
import { GetCountryDocumentResponseDto, GetCountryPillarDocumentResponseDto } from '../models/aiVm/GetCountryDocumentResponseDto';

=======
import { AiCitySummeryDto } from '../models/aiVm/AiCitySummeryDto';
import { AiCitySummeryRequestDto, AiCityDocumentRequestDto, AiCityPillarDocumentRequestDto, AiPillarQuetionsRequestDto, DeleteCityDocumentRequestDto } from '../models/aiVm/AiCitySummeryRequestDto';
import { PaginationResponse } from '../models/PaginationResponse';
import { AiCityPillarResponseDto } from '../models/aiVm/AiCityPillarResponseDto';
import { ResultResponseDto } from '../models/ResultResponseDto';
import { AITrustLevelVM } from '../models/aiVm/AITrustLevelVM';
import { AIEstimatedQuestionScoreDto } from '../models/aiVm/AIEstimatedQuestionScoreDto';
import { AiCrossCityResponseDto } from '../models/aiVm/AiCrossCityResponseDto';
import { ChangedAiCityEvaluationStatusDto } from '../models/aiVm/ChangedAiCityEvaluationStatusDto';
import { RegenerateAiSearchDto } from '../models/aiVm/RegenerateAiSearchDto';
import { AiCitySummeryRequestPdfDto } from '../models/aiVm/AiCitySummeryRequestPdfDto';
import { DownloadReportDto } from '../models/aiVm/downloadReportDto';
import { AITransferAssessmentRequestDto } from '../models/aiVm/AITransferAssessmentRequestDto';
import { GetCityDocumentResponseDto, GetCityPillarDocumentResponseDto } from '../models/aiVm/GetCityDocumentResponseDto';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

@Injectable({
  providedIn: 'root'
})
export class AiComputationService {

  constructor(private http: HttpService) { }

  public getAITrustLevels() {
    return this.http
      .get(`AiComputation/getAITrustLevels`)
      .pipe(map((x) => x as ResultResponseDto<AITrustLevelVM[]>));
  }

<<<<<<< HEAD
  public getAICountries(request: AiCountrySummeryRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICountries`, request)
      .pipe(map((x) => x as PaginationResponse<AiCountrySummeryDto>));
  }
  public getAICountryPillars(request: AiCountrySummeryRequestPdfDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICountryPillars`,request)
      .pipe(map((x) => x as ResultResponseDto<AiCountryPillarResponseDto>));
=======
  public getAICities(request: AiCitySummeryRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICities`, request)
      .pipe(map((x) => x as PaginationResponse<AiCitySummeryDto>));
  }
  public getAICityPillars(request: AiCitySummeryRequestPdfDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICityPillars`,request)
      .pipe(map((x) => x as ResultResponseDto<AiCityPillarResponseDto>));
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  public getAIPillarQuestions(request: AiPillarQuetionsRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAIPillarQuestions`, request)
      .pipe(map((x) => x as PaginationResponse<AIEstimatedQuestionScoreDto>));
  }
<<<<<<< HEAD
  public aiCountryDetailsReport(request:AiCountrySummeryRequestPdfDto) {
    return this.http
      .ImportFile(`AiComputation/aiCountryDetailsReport`,request);
  }
  public aiPillarDetailsReport(request:AiCountrySummeryRequestPdfDto) {
    return this.http
      .ImportFile(`AiComputation/aiPillarDetailsReport`,request);
  }
  public getAICrossCountryPillars(ids: number[]) {
    let payload = { countryIDs: ids };
    return this.http.post(`AiComputation/getAICrossCountryPillars`, payload).pipe(map(x => x as ResultResponseDto<AiCrossCountryResponseDto>));;
  }
  public changedAiCountryEvaluationStatus(payload: ChangedAiCountryEvaluationStatusDto) {
    return this.http.post(`AiComputation/changedAiCountryEvaluationStatus`, payload).pipe(map(x => x as ResultResponseDto<boolean>));;
=======
  public aiCityDetailsReport(request:AiCitySummeryRequestPdfDto) {
    return this.http
      .ImportFile(`AiComputation/aiCityDetailsReport`,request);
  }
  public aiPillarDetailsReport(request:AiCitySummeryRequestPdfDto) {
    return this.http
      .ImportFile(`AiComputation/aiPillarDetailsReport`,request);
  }
  public getAICrossCityPillars(ids: number[]) {
    let payload = { cityIDs: ids };
    return this.http.post(`AiComputation/getAICrossCityPillars`, payload).pipe(map(x => x as ResultResponseDto<AiCrossCityResponseDto>));;
  }
  public changedAiCityEvaluationStatus(payload: ChangedAiCityEvaluationStatusDto) {
    return this.http.post(`AiComputation/changedAiCityEvaluationStatus`, payload).pipe(map(x => x as ResultResponseDto<boolean>));;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  public regenerateAiSearch(payload: RegenerateAiSearchDto) {
    return this.http.post(`AiComputation/regenerateAiSearch`, payload).pipe(map(x => x as ResultResponseDto<boolean>));;
  }
  public addComment(payload: any) {
    return this.http.post(`AiComputation/addComment`, payload).pipe(map(x => x as ResultResponseDto<boolean>));;
  }
  public regenerateSinglePillarAiSearch(payload: RegenerateAiSearchDto) {
    return this.http.post(`AiComputation/regeneratePillarAiSearch`, payload).pipe(map(x => x as ResultResponseDto<boolean>));;
  }
<<<<<<< HEAD
  public aiAllCountryDetailsReport(payload:DownloadReportDto) {
    return this.http
      .ImportFile(`AiComputation/aiAllCountryDetailsReport`,payload);
=======
  public aiAllCityDetailsReport(payload:DownloadReportDto) {
    return this.http
      .ImportFile(`AiComputation/aiAllCityDetailsReport`,payload);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  public aiResultTransfer(payload:AITransferAssessmentRequestDto) {
    return this.http.post(`AiComputation/aiResultTransfer`, payload).pipe(map(x => x as ResultResponseDto<string>));;
  }
  public reCalculateKpis() {
    return this.http
      .get(`AiComputation/reCalculateKpis`)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }
  public uploadAiDocuments(formdata: FormData) {
    return this.http
      .UploadFile(`AiComputation/uploadAiDocuments`, formdata)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }

<<<<<<< HEAD
  public getAICountryDocuments(request: AiCountryDocumentRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICountryDocuments`, request)
      .pipe(map((x) => x as PaginationResponse<GetCountryDocumentResponseDto>));
  }

  public getAICountryPillarDocuments(request: AiCountryPillarDocumentRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICountryPillarDocuments`, request)
      .pipe(map((x) => x as ResultResponseDto<GetCountryPillarDocumentResponseDto[]>));
  }

  public deleteDocument(request: DeleteCountryDocumentRequestDto) {
=======
  public getAICityDocuments(request: AiCityDocumentRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICityDocuments`, request)
      .pipe(map((x) => x as PaginationResponse<GetCityDocumentResponseDto>));
  }

  public getAICityPillarDocuments(request: AiCityPillarDocumentRequestDto) {
    return this.http
      .getWithQueryParams(`AiComputation/getAICityPillarDocuments`, request)
      .pipe(map((x) => x as ResultResponseDto<GetCityPillarDocumentResponseDto[]>));
  }

  public deleteDocument(request: DeleteCityDocumentRequestDto) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    return this.http
      .post(`AiComputation/deleteDocument`, request)
      .pipe(map((x) => x as ResultResponseDto<string>));
  }

<<<<<<< HEAD
  public downloadDocument(countryDocumentID: number) {
    return this.http
      .ImportFile(`AiComputation/downloadDocument/` + countryDocumentID);
=======
  public downloadDocument(cityDocumentID: number) {
    return this.http
      .ImportFile(`AiComputation/downloadDocument/` + cityDocumentID);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
}
