import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CountryVM } from 'src/app/core/models/CountryVM';
import { NgSelectModule } from '@ng-select/ng-select';
import { environment } from 'src/environments/environment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SortDirection } from 'src/app/core/enums/SortDirection';
import { UserService } from 'src/app/core/services/user.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { PromptComponent } from 'src/app/shared/prompt/prompt.component';
import { AiCountrySummeryDto } from 'src/app/core/models/aiVm/AiCountrySummeryDto';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { TypingTextComponent } from 'src/app/shared/standAlone/typing-text/typing-text.component';
import { CircularScoreComponent } from 'src/app/shared/standAlone/circular-score/circular-score.component';
import { SparklineScoreComponent } from 'src/app/shared/standAlone/sparkline-score/sparkline-score.component';
import {  ViewCountryDetailComponent } from '../../../../shared/standAlone/view-country-detail/view-country-detail.component';
import { RegenerateAiScoreAndAddViewerComponent } from 'src/app/shared/standAlone/regenerate-ai-score-and-add-viewer/regenerate-ai-score-and-add-viewer.component';
import { GetAssignUserDto, PublicUserResponse } from 'src/app/core/models/UserInfo';
import { RegenerateAiSearchDto } from 'src/app/core/models/aiVm/RegenerateAiSearchDto';
import { AdminService } from '../../admin.service';
import { UtcToLocalTooltipDirective } from 'src/app/shared/directives/utc-to-local-tooltip.directive';
import { ActivatedRoute } from '@angular/router';
import { DocumentFormat } from 'src/app/core/enums/DocumentFormat';
import { AiCountrySummeryRequestDto } from 'src/app/core/models/aiVm/AiCountrySummeryRequestDto';
import { AiCountrySummeryRequestPdfDto } from 'src/app/core/models/aiVm/AiCountrySummeryRequestPdfDto';
import { ChangedAiCountryEvaluationStatusDto } from 'src/app/core/models/aiVm/ChangedAiCountryEvaluationStatusDto';
declare var bootstrap: any; // 👈 use Bootstrap JS API

@Component({
  selector: "app-aicountry-analysis",
  standalone: true,
  imports: [TypingTextComponent, CommonModule,
    CircularScoreComponent, SparklineScoreComponent,
    PaginationComponent, FormsModule, NgSelectModule, PromptComponent, RegenerateAiScoreAndAddViewerComponent,
    MatTooltipModule, UtcToLocalTooltipDirective, ViewCountryDetailComponent],
  templateUrl: './aicountry-analysis.component.html',
  styleUrl: './aicountry-analysis.component.css'
})
export class AICountryAnalysisComponent implements OnInit, OnDestroy {
  currentYear = new Date().getFullYear();
  selectedYear = this.currentYear;
  urlBase = environment.apiUrl;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isLoader: boolean = false;
  loading: boolean = false;
  aiCountries: AiCountrySummeryDto[] = [];
  selectedCountry?: AiCountrySummeryDto | null = null;
  countries: CountryVM[] | null = [];
  filterCountry!: number;
  selectedIndex: number = -1;
  selectedChangedStatusIndex: number = -1;
  evaluatorList: PublicUserResponse[] = [];
  isOpenResearchBox: boolean = false;
  isExporting: boolean = false;
  isRecalcualteKpi:boolean =false;
  showRegenerateMissingQuestionsOption:boolean = false;
  constructor(private aiComputationService: AiComputationService, private adminService: AdminService,
    private toaster: ToasterService, private userService: UserService, private cdr: ChangeDetectorRef,
    public commonService: CommonService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params["countryID"]) {
        this.filterCountry = +params["countryID"];
      }
    });
    this.getCountryUserCountries();
    this.getAiCountries();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
  yearChanged() {
    this.getAiCountries();
  }
  getCountryUserCountries() {
    this.adminService
      .getAllCountriesByUserId(this.userService.userInfo.userID ?? 0)
      .subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.countries   = res.result;
          } else {
            this.toaster.showError(res.errors.join(", "));
          }
        },
        error: () => {
          this.isLoader = false;
          this.toaster.showError("There is an error occure please try again");
        },
      });
  }

  getAiCountries(currentPage: any = 1) {
    this.isLoader = true;
    let payload: AiCountrySummeryRequestDto = {
      sortDirection: SortDirection.DESC,
      sortBy: "AIScore",
      pageNumber: currentPage,
      pageSize: this.pageSize,
      year: this.selectedYear
    }
    if (this.userService?.userInfo?.userID == null || this.filterCountry > 0) {
      payload.countryID = this.filterCountry;
    }
    this.aiCountries = [];
    this.aiComputationService.getAICountries(payload).subscribe({
      next: (res) => {
        this.aiCountries = res.data;
        this.totalRecords = res.totalRecords;
        this.currentPage = currentPage;
        this.pageSize = res.pageSize;
        this.isLoader = false;
      },
      error: () => {
        this.isLoader = false;
        this.toaster.showError("There is an Error Please Try later");
      },
    });
  }

  viewDetails(country: AiCountrySummeryDto) {
    this.selectedCountry = country;
    const sidebarEl = document.getElementById("kpiLayerSidebar");
    const offcanvas = new bootstrap.Offcanvas(sidebarEl);
    // Clear selection when sidebar closes
    sidebarEl?.addEventListener(
      "hidden.bs.offcanvas",
      () => {
        this.selectedCountry = null;
        this.cdr.detectChanges();
      },
      { once: true }
    );

    offcanvas.show();
  }


  aiCountryDetailsReport(country: AiCountrySummeryDto, selectedIndex: number, format: string,mode: 'ai' | 'manual') {
    this.selectedIndex = selectedIndex;
    if (this.selectedIndex == -1) return;

    let payload: AiCountrySummeryRequestPdfDto = {
      countryID: country.countryID,
      year: this.selectedYear,
      format: format,
      reportType : mode
    };

    this.aiComputationService.aiCountryDetailsReport(payload).subscribe({
      next: (blob) => {
        this.selectedIndex = -1;

        if (blob) {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");

          const ext = format == DocumentFormat.Pdf ? 'pdf' : 'docx';

          link.href = url;
          link.download = `${country.countryName}_Details_${new Date().toISOString().split("T")[0]}.${ext}`;

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          this.toaster.showSuccess("Report generated successfully");
        }
      },
      error: () => {
        this.selectedIndex = -1;
        this.toaster.showError("There is an error occurred please try again");
      }
    });
  }

  selectCountryChangedStatus(country: AiCountrySummeryDto, selectedIndex: number) {
    this.selectedChangedStatusIndex = selectedIndex;
    this.selectedCountry = country;
  }

  changeAiStatus() {
    if (this.selectedCountry) {
      let paylod: ChangedAiCountryEvaluationStatusDto = {
        countryID: this.selectedCountry.countryID,
        isVerified: !this.selectedCountry.isVerified,
      };
      this.aiComputationService
        .changedAiCountryEvaluationStatus(paylod)
        .subscribe({
          next: (res) => {
            this.selectedChangedStatusIndex = -1;
            if (res.succeeded) {
              this.getAiCountries();
              this.toaster.showSuccess(res.messages.join(", "));
            } else {
              this.toaster.showError(res.errors.join(", "));
            }
          },
          error: () => {
            this.toaster.showError("There is an error occure please try again");
            this.selectedChangedStatusIndex = -1;
          },
        });
    } else {
      this.toaster.showWarning("Please try again");
    }
  }

  cancelChangeAiStatus() {
    this.selectedChangedStatusIndex = -1;
  }

  opendialog(country: AiCountrySummeryDto) {
    this.isOpenResearchBox = true;
    this.showRegenerateMissingQuestionsOption =
  (country.aiCompletionRate ?? 0) > 0 &&
  (country.aiCompletionRate ?? 0) < 100;
    if (!this.evaluatorList.length) {
      //this.getUsersAssignedToCity();
    }
    this.selectedCountry = country;
    setTimeout(() => {
      const modalEl = document.getElementById("RegenerateAIScoreModal");
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
    const modalEl = document.getElementById("RegenerateAIScoreModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    this.isOpenResearchBox = false;
  }
  getUsersAssignedToCountry() {
    let payload: GetAssignUserDto = {
      userID: this.userService.userInfo.userID,
    };
    this.adminService.GetEvaluatorByAnalyst(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.evaluatorList = res.result ?? [];
        } else {
          this.toaster.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.toaster.showError("Failed to changed access");
      },
    });
  }
  regenerateAiSearch(payload: RegenerateAiSearchDto) {
    if (this.selectedCountry) {
      this.loading = true;

      this.aiComputationService.regenerateAiSearch(payload).subscribe({
        next: (res) => {
          this.loading = false;
          this.getAiCountries();
          this.selectedChangedStatusIndex = -1;
          if (res.succeeded) {
            this.toaster.showSuccess(res.messages.join(", "));
          } else {
            this.toaster.showError(res.errors.join(", "));
          }
          this.closeModal();
        },
        error: () => {
          this.loading = false;
          this.toaster.showError("There is an error occure please try again");
          this.selectedChangedStatusIndex = -1;
          this.closeModal();
        },
      });
    } else {
      this.toaster.showWarning("Please try again");
      this.closeModal();
    }
  }
  reCalculateKpis() {
    this.isRecalcualteKpi =true;

      this.aiComputationService.reCalculateKpis().subscribe({
        next: (res) => {
          this.isRecalcualteKpi =false;
          if (res.succeeded) {
            this.toaster.showSuccess(res.messages.join(", "));
          } else {
            this.toaster.showError(res.errors.join(", "));
          }
          this.closeModal();
        },
        error: () => {
          this.isRecalcualteKpi =false;
          this.toaster.showError("There is an error occure please try again");
          this.closeModal();
        },
      });
    
  }
  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.cityName?.toLowerCase().includes(term) ||
      item.cityAliasName?.toLowerCase().includes(term)
    );
  }
}
