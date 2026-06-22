import { Component, OnDestroy, OnInit } from "@angular/core";
<<<<<<< HEAD
import { CountryVM } from "src/app/core/models/CountryVM";
=======
import { CityVM } from "src/app/core/models/CityVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { PaginationUserRequest } from "src/app/core/models/PaginationRequest";
import { PaginationResponse } from "src/app/core/models/PaginationResponse";
import { ToasterService } from "src/app/core/services/toaster.service";
import { UserService } from "src/app/core/services/user.service";
import { Router } from "@angular/router";
import { EvaluatorService } from "../../evaluator.service";
import { GetAssessmentResponse } from "src/app/core/models/AssessmentResponse";
import { GetAssessmentRequestDto } from "src/app/core/models/AssessmentRequest";
import { SortDirection } from "src/app/core/enums/SortDirection";
import { CommonService } from "src/app/core/services/common.service";
import { AssessmentPhase } from "src/app/core/enums/AssessmentPhase";
<<<<<<< HEAD
import { SendRequestMailToUpdateCountry } from "src/app/core/models/AnalystVM";
=======
import { SendRequestMailToUpdateCity } from "src/app/core/models/AnalystVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

@Component({
  selector: "app-assessment-result",
  templateUrl: "./assessment-result.component.html",
  styleUrl: "./assessment-result.component.css",
})
export class AssessmentResultComponent implements OnInit {
  currentYear = new Date().getFullYear();
  selectedYear= this.currentYear;
<<<<<<< HEAD
  selectedCountryID: number | any = "";
=======
  selectedcityID: number | any = "";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  assessmentsResponse: PaginationResponse<GetAssessmentResponse> | undefined;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
<<<<<<< HEAD
  countries: CountryVM[] | null = [];
=======
  cities: CityVM[] | null = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  isLoader: boolean = false;
  constructor(
    private evaluatorService: EvaluatorService,
    public commonService: CommonService,
    private userService: UserService,
    private toaster: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.getAllCountriesByUserId();
=======
    this.getAllCitiesByUserId();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    this.getAssessments();
  }

  goToAssessment(assessment: GetAssessmentResponse) {
    this.router.navigate([
      "/evaluator/assessment-result",
      assessment.assessmentID,
      assessment.userName,
    ]);
  }

  ngOnDestroy(): void {}

  getAssessments(currentPage: number = 1) {
    this.isLoader = true;
    this.assessmentsResponse = undefined;
    let payload: GetAssessmentRequestDto = {
      sortDirection: SortDirection.DESC,
      sortBy: "createdAt",
      pageNumber: currentPage,
      pageSize: this.pageSize,
      userId: this.userService?.userInfo?.userID,
<<<<<<< HEAD
      countryID: this.selectedCountryID,
=======
      cityID: this.selectedcityID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      updatedAt:this.commonService.getStartOfYearLocal(this.selectedYear)
    };
    this.evaluatorService
      .getAssessmentResults(payload)
      .subscribe((assessments) => {
        this.assessmentsResponse = assessments;
        this.totalRecords = assessments.totalRecords;
        this.currentPage = currentPage;
        this.pageSize = assessments.pageSize;
        this.isLoader = false;
      });
  }
<<<<<<< HEAD
  getAllCountriesByUserId() {
    this.evaluatorService
      .getAllCountriesByUserId(this.userService?.userInfo?.userID)
      .subscribe({
        next: (res) => {
          this.countries = res.result;
          if (this.countries) {
            //this.selectedCountryID = this.countries?.length > 0 ? this.countries[0].countryID : null
          } else {
            this.toaster.showWarning("No country assigned");
=======
  getAllCitiesByUserId() {
    this.evaluatorService
      .getAllCitiesByUserId(this.userService?.userInfo?.userID)
      .subscribe({
        next: (res) => {
          this.cities = res.result;
          if (this.cities) {
            //this.selectedcityID = this.cities?.length > 0 ? this.cities[0].cityID : null
          } else {
            this.toaster.showWarning("No city assigned");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          }
        },
      });
  }

  assessmentPhaseAction(assessment: GetAssessmentResponse) {
    let userRole = this.userService.userInfo.role;
    switch (assessment.assessmentPhase) {
      case AssessmentPhase.InProgress: {
<<<<<<< HEAD
        this.evaluatorService.userCountryMappingIDSubject$.next(
          assessment.userCountryMappingID
=======
        this.evaluatorService.userCityMappingIDSubject$.next(
          assessment.userCityMappingID
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        );
        this.router.navigate(["evaluator/make-assessment"]);
        break;
      }
      case  AssessmentPhase.EditApproved: {
<<<<<<< HEAD
        this.evaluatorService.userCountryMappingIDSubject$.next(
          assessment.userCountryMappingID
=======
        this.evaluatorService.userCityMappingIDSubject$.next(
          assessment.userCityMappingID
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        );
        this.router.navigate(["evaluator/make-assessment"]);
        break;
      }
      case AssessmentPhase.EditRequested:
        break;
        case AssessmentPhase.EditRejected : {
        this.sendMailForEditAssessment(
<<<<<<< HEAD
          assessment.userCountryMappingID,
=======
          assessment.userCityMappingID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          assessment.assignedByUserId
        );
        break;
      }
      case AssessmentPhase.Completed : {
        this.sendMailForEditAssessment(
<<<<<<< HEAD
          assessment.userCountryMappingID,
=======
          assessment.userCityMappingID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          assessment.assignedByUserId
        );
        break;
      }

    }
  }

<<<<<<< HEAD
  sendMailForEditAssessment(userCountryMappingID: number, mailToUserID: number) {
    let payload: SendRequestMailToUpdateCountry = {
      userID: this.userService.userInfo.userID,
      userCountryMappingID: userCountryMappingID,
=======
  sendMailForEditAssessment(userCityMappingID: number, mailToUserID: number) {
    let payload: SendRequestMailToUpdateCity = {
      userID: this.userService.userInfo.userID,
      userCityMappingID: userCityMappingID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      mailToUserID: mailToUserID,
    };
    this.evaluatorService.sendMailForEditAssessment(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.toaster.showSuccess(res.messages.join(", "));
          this.getAssessments(this.currentPage);
        } else {
          this.toaster.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.toaster.showError("Failed to provide access");
      },
    });
  }
}
