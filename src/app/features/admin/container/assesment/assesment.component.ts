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
import { PublicUserResponse } from "src/app/core/models/UserInfo";
import { UserRoleValue } from "src/app/core/enums/UserRole";
import { AdminService } from "../../admin.service";
import { AssessmentPhase } from "src/app/core/enums/AssessmentPhase";
import { CommonService } from "src/app/core/services/common.service";
import { AITransferAssessmentRequestDto } from "src/app/core/models/aiVm/AITransferAssessmentRequestDto";
import { finalize } from "rxjs";
import { AiComputationService } from "src/app/core/services/ai-computation.service";
declare var bootstrap: any;
@Component({
  selector: "app-assesment",
  templateUrl: "./assesment.component.html",
  styleUrl: "./assesment.component.css",
})
export class AssesmentComponent implements OnInit {
  selectedYear = new Date().getFullYear();
  isLoader: boolean = false;
  isOpendialog = false;
<<<<<<< HEAD
  selectedCountryID: number | any = "";
=======
  selectedcityID: number | any = "";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  selectedRoleID: UserRoleValue | any = "";
  selectedAssessment: GetAssessmentResponse | any = "";
  changeAssessment: ChangeAssessmentStatusRequestDto | any = "";
  assessmentsResponse: PaginationResponse<GetAssessmentResponse> | undefined;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
<<<<<<< HEAD
  countries: CountryVM[] | null = [];
  loading: boolean = false;
  evaluators: PublicUserResponse[] | null = [];
  userofSelectedCountryResponse: GetAssessmentResponse[] = [];
=======
  cities: CityVM[] | null = [];
  loading: boolean = false;
  evaluators: PublicUserResponse[] | null = [];
  userofSelecteCityResponse: GetAssessmentResponse[] = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  isAItransfer:boolean=false;
  rolesList = [
    { name: "Analyst", role: UserRoleValue.Analyst },
    { name: "Evaluator", role: UserRoleValue.Evaluator },
  ];

  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private toaster: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private aiComputationService: AiComputationService
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.getAllCountriesByUserId();
    this.route.paramMap.subscribe((params) => {
      let rid = params.get("roleID");
      let cid = params.get("countryID");
      if (rid && cid) {
        this.selectedRoleID = rid;
        this.selectedCountryID = cid;
=======
    this.getAllCitiesByUserId();
    this.route.paramMap.subscribe((params) => {
      let rid = params.get("roleID");
      let cid = params.get("cityID");
      if (rid && cid) {
        this.selectedRoleID = rid;
        this.selectedcityID = cid;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      }
    });
    this.getAssessments();
  }

  goToAssessment(assessment: GetAssessmentResponse) {
    this.router.navigate([
      "/admin/assessment-result",
      assessment.assessmentID,
      assessment.userName,
    ]);
  }

  ngOnDestroy(): void {}

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
      role: this.selectedRoleID,
      updatedAt: this.commonService.getStartOfYearLocal(this.selectedYear),
    };
    this.adminService.getAssessmentResults(payload).subscribe((assessments) => {
      this.assessmentsResponse = assessments;
      this.totalRecords = assessments.totalRecords;
      this.currentPage = currentPage;
      this.pageSize = assessments.pageSize;
      this.isLoader = false;
    });
  }
<<<<<<< HEAD
  getAllCountriesByUserId() {
    this.adminService
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
    this.adminService
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

    this.adminService.changeAssessmentStatus(this.changeAssessment).subscribe({
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
  selectAssessement(selectedAssessment: GetAssessmentResponse) {
    this.selectedAssessment = selectedAssessment;
<<<<<<< HEAD
    this.getUsersAssignedToCountry();
=======
    this.getUsersAssignedToCity();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    this.opendialog();
  }
  transferAssessment(payload:TransferAssessmentRequestDto) {
    this.loading =true;
    if (this.selectedAssessment == null) {
      this.toaster.showError("Plese select assessment");
    }
    this.adminService.transferAssessment(payload).subscribe({
      next: (res) => {
        this.closeModal();
        if (res.succeeded) {
          this.getAssessments(this.currentPage);
          this.toaster.showSuccess(res.messages.join(", "));
        } else {
          this.toaster.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.closeModal();
        this.toaster.showError("Failed to transfer assessment");
      },
    });
  }

  opendialog() {
    this.isOpendialog = true;
    setTimeout(() => {
      const modalEl = document.getElementById("exampleModal");
      if (modalEl) {
        let modalInstance = bootstrap.Modal.getInstance(modalEl);
        if (!modalInstance) {
          modalInstance = new bootstrap.Modal(modalEl);
        }
        modalInstance.show(); // ✅ use show()
      }
    }, 100);
  }
  closeModal() {
    this.loading = false;
    const modalEl = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    this.isOpendialog = false;
  }
<<<<<<< HEAD
  getUsersAssignedToCountry() {
=======
  getUsersAssignedToCity() {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    if (this.selectedAssessment == null) {
      this.toaster.showError("Plese select assessment");
    }
    this.adminService
<<<<<<< HEAD
      .getUsersAssignedToCountry(this.selectedAssessment.countryID)
      .subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.userofSelectedCountryResponse = res.result ?? [];
=======
      .getUsersAssignedToCity(this.selectedAssessment.cityID)
      .subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.userofSelecteCityResponse = res.result ?? [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          } else {
            this.toaster.showError(res.errors.join(", "));
          }
        },
        error: () => {
          this.toaster.showError("Failed to changed access");
        },
      });
  }


  selectAIAssessement(selectedAssessment: GetAssessmentResponse) {
    this.selectedAssessment = selectedAssessment;
  }

<<<<<<< HEAD
    aiResultTransfer() {  
  
      if (!this.selectedAssessment) {
        this.toaster.showWarning("Please select a country");
=======
    aiResultTransfer() {
  
  
      if (!this.selectedAssessment) {
        this.toaster.showWarning("Please select a city");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        return;
      }
  
      const payload: AITransferAssessmentRequestDto = {
<<<<<<< HEAD
        countryID: this.selectedAssessment.countryID,
=======
        cityID: this.selectedAssessment.cityID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        transferToUserID: this.selectedAssessment.userID
      };
  
      this.isAItransfer = true;
      this.isLoader = true;
  
      this.aiComputationService.aiResultTransfer(payload)
      .pipe(finalize(() => {
        this.isLoader = false
        this.isAItransfer = false
      }))
      .subscribe({
        next: (res) => {
          if (res?.succeeded) {
            this.getAssessments(this.currentPage);
            this.toaster.showSuccess(res.messages?.join(", ") || "Transfer successful");
          } else {
            this.toaster.showError(res.errors?.join(", ") || "Transfer failed");
          }
        },
        error: () => {
          this.toaster.showError("Failed to transfer assessment. Please try again.");
        }
      });
    }
  
}
