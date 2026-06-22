import { Component, OnInit } from "@angular/core";
<<<<<<< HEAD
import { CountryVM } from "src/app/core/models/CountryVM";
=======
import { CityVM } from "src/app/core/models/CityVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { PaginationResponse } from "src/app/core/models/PaginationResponse";
import { ToasterService } from "src/app/core/services/toaster.service";
import { UserService } from "src/app/core/services/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { GetAssessmentResponse } from "src/app/core/models/AssessmentResponse";
import {
  ChangeAssessmentStatusRequestDto,
  GetAssessmentRequestDto,
  TransferAssessmentRequestDto,
} from "src/app/core/models/AssessmentRequest";
import { SortDirection } from "src/app/core/enums/SortDirection";
import { AnalystService } from "../../analyst.service";
import {
  GetAssignUserDto,
  PublicUserResponse,
} from "src/app/core/models/UserInfo";
import {
  AssessmentPhase } from "src/app/core/enums/AssessmentPhase";
import { CommonService } from "src/app/core/services/common.service";
<<<<<<< HEAD
import { SendRequestMailToUpdateCountry } from "src/app/core/models/AnalystVM";
=======
import { SendRequestMailToUpdateCity } from "src/app/core/models/AnalystVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

@Component({
  selector: "app-evaluator-responses",
  templateUrl: "./evaluator-responses.component.html",
  styleUrl: "./evaluator-responses.component.css",
})
export class EvaluatorResponsesComponent implements OnInit {
  currentYear = new Date().getFullYear();
  selectedYear = this.currentYear;
<<<<<<< HEAD
  selectedCountryID: number | any = "";
=======
  selectedcityID: number | any = "";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  selecteduserID: number | any = "";
  selectedAssessment: GetAssessmentResponse | any = "";
  changeAssessment: ChangeAssessmentStatusRequestDto | any = "";
  assessmentsResponse: PaginationResponse<GetAssessmentResponse> | undefined;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
<<<<<<< HEAD
  countries: CountryVM[] | null = [];
=======
  cities: CityVM[] | null = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  evaluators: PublicUserResponse[] | null = [];
  assessmentUserID: number | any = 0;
  isLoader: boolean = false;
  constructor(
    private analystService: AnalystService,
    private userService: UserService,
    private toaster: ToasterService,
    public commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.assessmentUserID = params.get("assessmentUserID");
      let uid = params.get("userID");
<<<<<<< HEAD
      let cid = params.get("countryID");
      if (uid && cid && !this.assessmentUserID) {
        this.selectedCountryID = cid;
        this.selecteduserID = uid;
      }
    });
    this.getAllCountriesByUserId();
=======
      let cid = params.get("cityID");
      if (uid && cid && !this.assessmentUserID) {
        this.selectedcityID = cid;
        this.selecteduserID = uid;
      }
    });
    this.getAllCitiesByUserId();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

    if (!this.assessmentUserID) {
      this.GetEvaluatorByAnalyst();
    }
    this.getAssessments();
  }

  goToAssessment(assessment: GetAssessmentResponse) {
    this.router.navigate([
      "/analyst/assessment-result",
      assessment.assessmentID,
      assessment.userName,
    ]);
  }

  ngOnDestroy(): void {}

  assessmentPhaseAction(assessment: GetAssessmentResponse) {
    switch (assessment.assessmentPhase) {
      case AssessmentPhase.InProgress: {
        if (this.assessmentUserID) {
<<<<<<< HEAD
          this.analystService.userCountryMappingIDSubject$.next(
            assessment.userCountryMappingID
=======
          this.analystService.userCityMappingIDSubject$.next(
            assessment.userCityMappingID
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          );
          this.router.navigate(["analyst/analyst-assessment"]);
        }
        break;
      }
      case AssessmentPhase.EditApproved: {
        if (this.assessmentUserID) {
<<<<<<< HEAD
          this.analystService.userCountryMappingIDSubject$.next(
            assessment.userCountryMappingID
=======
          this.analystService.userCityMappingIDSubject$.next(
            assessment.userCityMappingID
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          );
          this.router.navigate(["analyst/analyst-assessment"]);
        }
        break;
      }
      case AssessmentPhase.EditRequested:
        break;
      case AssessmentPhase.EditRejected: {
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
      case AssessmentPhase.Completed: {
        if (this.assessmentUserID) {
          this.sendMailForEditAssessment(
<<<<<<< HEAD
            assessment.userCountryMappingID,
=======
            assessment.userCityMappingID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
            assessment.assignedByUserId
          );
        }
        break;
      }
    }
  }
  getAssessments(currentPage: number = 1) {
    this.assessmentsResponse = undefined;
    this.isLoader = true;
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
      subUserID: this.assessmentUserID
        ? this.assessmentUserID
        : this.selecteduserID,
      updatedAt: this.commonService.getStartOfYearLocal(this.selectedYear),
    };
    this.analystService
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
    this.analystService
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
    this.analystService
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
  GetEvaluatorByAnalyst() {
    let payload: GetAssignUserDto = {
      userID: this.userService.userInfo.userID,
    };
    this.analystService.GetEvaluatorByAnalyst(payload).subscribe({
      next: (res) => {
        this.evaluators = res.result;
      },
    });
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
    this.analystService.sendMailForEditAssessment(payload).subscribe({
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

  selectChangedAssessment(assessmentPhase: AssessmentPhase,assessmentID: number){
    this.changeAssessment  =  {
      userID: this.userService.userInfo.userID,
      assessmentPhase: assessmentPhase,
      assessmentID: assessmentID,
    } as ChangeAssessmentStatusRequestDto;
  }
  changeAssessmentStatus() {
    if(this.changeAssessment == null) {
      this.toaster.showError("please select assessment");
    }

    this.analystService.changeAssessmentStatus(this.changeAssessment).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.getAssessments(this.currentPage);
          this.toaster.showSuccess(res.messages.join(", "));
        } else {
          this.toaster.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.toaster.showError("Failed to changed access");
      },
    });
  }

  selectAssessement(selectedAssessment : GetAssessmentResponse){
    this.selectedAssessment = selectedAssessment;
  }
  transferAssessment() {
    if(this.selectedAssessment ==null){
      this.toaster.showError("Plese select assessment");
    }
    let payload: TransferAssessmentRequestDto = {
      transferToUserID: this.userService.userInfo.userID,
      assessmentID: this.selectedAssessment.assessmentID,
    };
    this.analystService.transferAssessment(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.toaster.showSuccess(res.messages.join(", "));
        } else {
          this.toaster.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.toaster.showError("Failed to transfer assessment");
      },
    });
  }
}
