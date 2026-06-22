import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { forkJoin } from 'rxjs';
import { SortDirection } from 'src/app/core/enums/SortDirection';
<<<<<<< HEAD
import { AiPillarQuetionsRequestDto } from 'src/app/core/models/aiVm/AiCountrySummeryRequestDto';
import { AIEstimatedQuestionScoreDto } from 'src/app/core/models/aiVm/AIEstimatedQuestionScoreDto';
import { AITrustLevelVM } from 'src/app/core/models/aiVm/AITrustLevelVM';
import { CountryVM } from 'src/app/core/models/CountryVM';
import { PillarsVM } from 'src/app/core/models/PillersVM';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { CountryUserService } from 'src/app/features/country-user/country-user.service';
=======
import { AiPillarQuetionsRequestDto } from 'src/app/core/models/aiVm/AiCitySummeryRequestDto';
import { AIEstimatedQuestionScoreDto } from 'src/app/core/models/aiVm/AIEstimatedQuestionScoreDto';
import { AITrustLevelVM } from 'src/app/core/models/aiVm/AITrustLevelVM';
import { CityVM } from 'src/app/core/models/CityVM';
import { PillarsVM } from 'src/app/core/models/PillersVM';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { CityUserService } from 'src/app/features/city-user/city-user.service';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { PaginationComponent } from 'src/app/shared/pagination/pagination.component';
import { CircularScoreComponent } from 'src/app/shared/standAlone/circular-score/circular-score.component';
import { SparklineScoreComponent } from 'src/app/shared/standAlone/sparkline-score/sparkline-score.component';
import { TypingTextComponent } from 'src/app/shared/standAlone/typing-text/typing-text.component';
import { ViewAiQuestionDetailsComponent } from '../../../../shared/standAlone/view-ai-question-details/view-ai-question-details.component';
import { AdminService } from 'src/app/features/admin/admin.service';
import { UserService } from 'src/app/core/services/user.service';
import { CommonService } from 'src/app/core/services/common.service';
import { UtcToLocalTooltipDirective } from 'src/app/shared/directives/utc-to-local-tooltip.directive';

declare var bootstrap: any; // 👈 use Bootstrap JS API
@Component({
  selector: 'app-ai-question-analysis',
  standalone: true,
  imports: [TypingTextComponent, CommonModule,
    ViewAiQuestionDetailsComponent, CircularScoreComponent, SparklineScoreComponent,
    PaginationComponent, FormsModule, NgSelectModule,
    MatTooltipModule, UtcToLocalTooltipDirective],
  templateUrl: './ai-question-analysis.component.html',
  styleUrl: './ai-question-analysis.component.css'
})
export class AiQuestionAnalysisComponent implements OnInit, OnChanges {
  selectedYear = new Date().getFullYear();
<<<<<<< HEAD
  selectedCountryID!: number;
  selectedPillarID!: number;
  selectedQuestion: AIEstimatedQuestionScoreDto | null = null;
  isLoader: boolean = false;
  countries: CountryVM[] = [];
=======
  selectedCityID!: number;
  selectedPillarID!: number;
  selectedQuestion: AIEstimatedQuestionScoreDto | null = null;
  isLoader: boolean = false;
  cities: CityVM[] = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  aiQuestions: AIEstimatedQuestionScoreDto[] = [];
  pillars: PillarsVM[] = [];
  aiTrustLevels: AITrustLevelVM[] = [];
  adminService = inject(AdminService);
  userService = inject(UserService);
  headerTextValue: string | null = null;
  headerTextRepeatation: boolean = false;
  constructor(private route: ActivatedRoute, private toaster: ToasterService, private aiComputationService: AiComputationService, private cdr: ChangeDetectorRef, public commonService: CommonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
  }

  updateHeaderText() {
    this.headerTextValue = null;
    this.headerTextRepeatation = false;

    const p = this.pillars.find(x => x.pillarID === this.selectedPillarID)?.pillarName ?? '';
<<<<<<< HEAD
    const c = this.countries.find(x => x.countryID === this.selectedCountryID)?.countryName ?? '';
=======
    const c = this.cities.find(x => x.cityID === this.selectedCityID)?.cityName ?? '';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

    setTimeout(() => {
      this.headerTextRepeatation = true;

      const truncatedPillar =
        p.length > 27 ? `${p.substring(0, 20)}...` : p;

      this.headerTextValue =
        c && p
          ? `${c} > ${truncatedPillar} Analysis`
          : '';

    }, 500);
  }

  ngOnInit(): void {
    this.isLoader = true;
    this.loadInitialData();
    this.getAITrustLevels();
    this.route.queryParams.subscribe(params => {
<<<<<<< HEAD
      let cid = +params['countryID'] || null;
      let pid = +params['pillarID'] || null;
      let sYear = +params['year'] || this.selectedYear;
      if (pid && cid) {
        this.selectedCountryID = Number(cid);
=======
      let cid = +params['cityID'] || null;
      let pid = +params['pillarID'] || null;
      let sYear = +params['year'] || this.selectedYear;
      if (pid && cid) {
        this.selectedCityID = Number(cid);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        this.selectedPillarID = Number(pid);
        this.selectedYear = Number(sYear);
        this.getAIPillarQuestions();
      }
    });
  }

  getAITrustLevels() {
    this.aiComputationService.getAITrustLevels().subscribe((p) => {
      this.aiTrustLevels = p.result || [];
    });
  }


  loadInitialData() {
    this.isLoader = true;

    forkJoin({
      pillarsRes: this.adminService.getAllPillars(),
<<<<<<< HEAD
      countriesRes: this.adminService.getAllCountriesByUserId(this.userService.userInfo?.userID ?? 0)
    }).subscribe({
      next: ({ pillarsRes, countriesRes }) => {

        this.pillars = pillarsRes ?? [];
        if (countriesRes.succeeded) {
          this.countries = countriesRes.result ?? [];
        } else {
          this.toaster.showError(countriesRes.errors.join(', '));
        }

        if ((!this.selectedPillarID && !this.selectedCountryID) && this.pillars.length && this.countries.length) {
          this.selectedPillarID = this.pillars[0].pillarID
          this.selectedCountryID = this.countries[0].countryID
=======
      citiesRes: this.adminService.getAllCitiesByUserId(this.userService.userInfo?.userID ?? 0)
    }).subscribe({
      next: ({ pillarsRes, citiesRes }) => {

        this.pillars = pillarsRes ?? [];
        if (citiesRes.succeeded) {
          this.cities = citiesRes.result ?? [];
        } else {
          this.toaster.showError(citiesRes.errors.join(', '));
        }

        if ((!this.selectedPillarID && !this.selectedCityID) && this.pillars.length && this.cities.length) {
          this.selectedPillarID = this.pillars[0].pillarID
          this.selectedCityID = this.cities[0].cityID
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          this.getAIPillarQuestions()
        }
      },
      error: () => {
        this.isLoader = false;
        this.toaster.showError('There is an error occurred, please try again');
      }
    });
  }

  getAIPillarQuestions(currentPage: any = 1) {
    this.isLoader = true;
    let payload: AiPillarQuetionsRequestDto = {
      sortDirection: SortDirection.DESC,
      sortBy: 'AIScore',
      pageNumber: currentPage,
      pageSize: this.pageSize,
      year: this.selectedYear
    }
<<<<<<< HEAD
    if (this.selectedCountryID > 0) {
      payload.countryID = this.selectedCountryID;
=======
    if (this.selectedCityID > 0) {
      payload.cityID = this.selectedCityID;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    }
    if (this.selectedPillarID > 0) {
      payload.pillarID = this.selectedPillarID;
    }

    this.aiComputationService.getAIPillarQuestions(payload).subscribe({
      next: (res) => {
        this.updateHeaderText();
        this.isLoader = false;
        this.aiQuestions = res.data;
        this.totalRecords = res.totalRecords;
        this.currentPage = currentPage;
        this.pageSize = res.pageSize;
        this.isLoader = false;
      },
      error: () => {
        this.isLoader = false;
        this.toaster.showError("There is an Error Please Try later")
      }
    })
  }

<<<<<<< HEAD
  viewDetails(country: AIEstimatedQuestionScoreDto) {
    this.selectedQuestion = country;
=======
  viewDetails(city: AIEstimatedQuestionScoreDto) {
    this.selectedQuestion = city;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    const sidebarEl = document.getElementById('kpiLayerSidebar');
    const offcanvas = new bootstrap.Offcanvas(sidebarEl);

    // Clear selection when sidebar closes
    sidebarEl?.addEventListener('hidden.bs.offcanvas', () => {
      this.selectedQuestion = null;
      this.cdr.detectChanges();
    }, { once: true });

    offcanvas.show();
  }
}
