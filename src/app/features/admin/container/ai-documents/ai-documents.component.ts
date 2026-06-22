declare var bootstrap: any; 
import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';


import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/share.module';
import { PillarsVM } from 'src/app/core/models/PillersVM';
import { UserService } from 'src/app/core/services/user.service';
import { SortDirection } from 'src/app/core/enums/SortDirection';
import { CommonService } from 'src/app/core/services/common.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { PaginationResponse } from 'src/app/core/models/PaginationResponse';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { CircularScoreComponent } from 'src/app/shared/standAlone/circular-score/circular-score.component';
import { SparklineScoreComponent } from 'src/app/shared/standAlone/sparkline-score/sparkline-score.component';
<<<<<<< HEAD
import { GetCountryDocumentResponseDto, GetCountryPillarDocumentResponseDto} from 'src/app/core/models/aiVm/GetCountryDocumentResponseDto';
import { CountryVM } from 'src/app/core/models/CountryVM';
import { AdminService } from 'src/app/features/admin/admin.service';
import { AiCountryDocumentRequestDto, AiCountryPillarDocumentRequestDto, DeleteCountryDocumentRequestDto,  } from 'src/app/core/models/aiVm/AiCountrySummeryRequestDto';
=======
import { GetCityDocumentResponseDto, GetCityPillarDocumentResponseDto} from 'src/app/core/models/aiVm/GetCityDocumentResponseDto';
import { CityVM } from 'src/app/core/models/CityVM';
import { AdminService } from 'src/app/features/admin/admin.service';
import { AiCityDocumentRequestDto, AiCityPillarDocumentRequestDto, DeleteCityDocumentRequestDto,  } from 'src/app/core/models/aiVm/AiCitySummeryRequestDto';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { AiDocumentViewDetailsComponent } from "src/app/shared/standAlone/ai-document-view-details/ai-document-view-details.component";

@Component({
  selector: 'app-ai-documents',
  standalone: true,
  imports: [CommonModule, SharedModule, SparklineScoreComponent, CircularScoreComponent, AiDocumentViewDetailsComponent],
  templateUrl: './ai-documents.component.html',
  styleUrl: './ai-documents.component.css'
})
export class AiDocumentsComponent {

  selectedYear = new Date().getFullYear();
  urlBase = environment.apiUrl;
<<<<<<< HEAD
  selectedCountry: GetCountryDocumentResponseDto | null | undefined = null;
  selectedCountryID?: number;
  selecteddocumentLayerID?: number;
  documentLayersResponse: PaginationResponse<GetCountryDocumentResponseDto> | undefined;
=======
  selectedCity: GetCityDocumentResponseDto | null | undefined = null;
  selectedCityID?: number;
  selecteddocumentLayerID?: number;
  documentLayersResponse: PaginationResponse<GetCityDocumentResponseDto> | undefined;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isLoader: boolean = false;
<<<<<<< HEAD
  countryList: CountryVM[] = [];
  pillars: PillarsVM[] = [];
  $documentChanged = new Subject();
  documentLayers: GetCountryDocumentResponseDto[] = [];
=======
  cityList: CityVM[] = [];
  pillars: PillarsVM[] = [];
  $documentChanged = new Subject();
  documentLayers: GetCityDocumentResponseDto[] = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  sidebarLoader = {
    index: -1,
    loader: false
  }
  selectedDoc: any = null;
  saveDocumentLoader: boolean = false;
  isDeletePromptOpen = false;
<<<<<<< HEAD
  countryPillarDocuments: GetCountryPillarDocumentResponseDto[] = [];
=======
  cityPillarDocuments: GetCityPillarDocumentResponseDto[] = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

  constructor(private adminService: AdminService,
    private toaster: ToasterService,
    private userService: UserService,
    public commonService: CommonService,
    private aiComputationService: AiComputationService) { }


  ngOnInit(): void {
<<<<<<< HEAD
    this.getAICountryDocuments(1);
    this.getCountryUserCountries();
    this.getPillars();
    this.$documentChanged.pipe(debounceTime(1000)).subscribe(x => {
      this.getAICountryDocuments();
=======
    this.getAICityDocuments(1);
    this.getCityUserCities();
    this.getPillars();
    this.$documentChanged.pipe(debounceTime(1000)).subscribe(x => {
      this.getAICityDocuments();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    });
  }
  documentChanged() {
    this.$documentChanged.next(true);
  }
  getPillars() {
    this.adminService.getAllPillars().subscribe(r => {
      this.pillars = r;
    })
  }
<<<<<<< HEAD
  getAICountryDocuments(currentPage: any = 1) {
    this.documentLayersResponse = undefined;
    this.isLoader = true;
    let payload: AiCountryDocumentRequestDto = {
      sortDirection: SortDirection.ASC,
      sortBy: 'CountryName',
      pageNumber: currentPage,
      pageSize: this.pageSize
    }
    if (this.selectedCountryID != undefined && this.selectedCountryID != 0) {
      payload.countryID = this.selectedCountryID;
    }

    this.aiComputationService.getAICountryDocuments(payload).subscribe(documentLayers => {
=======
  getAICityDocuments(currentPage: any = 1) {
    this.documentLayersResponse = undefined;
    this.isLoader = true;
    let payload: AiCityDocumentRequestDto = {
      sortDirection: SortDirection.ASC,
      sortBy: 'CityName',
      pageNumber: currentPage,
      pageSize: this.pageSize
    }
    if (this.selectedCityID != undefined && this.selectedCityID != 0) {
      payload.cityID = this.selectedCityID;
    }

    this.aiComputationService.getAICityDocuments(payload).subscribe(documentLayers => {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      this.documentLayersResponse = documentLayers;
      this.totalRecords = documentLayers.totalRecords;
      this.currentPage = currentPage;
      this.pageSize = documentLayers.pageSize;
      this.isLoader = false;
    });
  }

  ngOnDestroy(): void { }

<<<<<<< HEAD
  viewDetails(country: GetCountryDocumentResponseDto, index: number) {
    this.selectedCountry = country;
    this.sidebarLoader.index = index;
    this.sidebarLoader.loader = true;
    this.getAICountryPillarDocuments();
  }

  getCountryUserCountries() {
    this.adminService.getAllCountriesByUserId(this.userService.userInfo.userID ?? 0).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.countryList = res.result ?? [];
=======
  viewDetails(city: GetCityDocumentResponseDto, index: number) {
    this.selectedCity = city;
    this.sidebarLoader.index = index;
    this.sidebarLoader.loader = true;
    this.getAICityPillarDocuments();
  }

  getCityUserCities() {
    this.adminService.getAllCitiesByUserId(this.userService.userInfo.userID ?? 0).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.cityList = res.result ?? [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        }
      }
    });
  }
<<<<<<< HEAD
  getAICountryPillarDocuments(isOpen = true) {   
    let payload: AiCountryPillarDocumentRequestDto = {
      countryID: this.selectedCountry?.countryID ?? 0
    }
    this.aiComputationService.getAICountryPillarDocuments(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.countryPillarDocuments = res.result ?? [];
=======
  getAICityPillarDocuments(isOpen = true) {   
    let payload: AiCityPillarDocumentRequestDto = {
      cityID: this.selectedCity?.cityID ?? 0
    }
    this.aiComputationService.getAICityPillarDocuments(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.cityPillarDocuments = res.result ?? [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          if (isOpen) {
            this.sidebarLoader.index = -1;
            this.sidebarLoader.loader = false;
            const sidebarEl = document.getElementById('documentLayerSidebar');
            const offcanvas = new bootstrap.Offcanvas(sidebarEl);
            offcanvas.show();
          }
        }
      }
    });
  }

  uploadAiDocuments(event: any) {
    this.saveDocumentLoader = true;
    this.aiComputationService.uploadAiDocuments(event).subscribe({
      next: (res) => {
        this.saveDocumentLoader = false;
        if (res.succeeded) {
<<<<<<< HEAD
          this.getAICountryPillarDocuments(false);
          this.toaster.showSuccess(res.messages.join(", "));
          this.getAICountryDocuments();
=======
          this.getAICityPillarDocuments(false);
          this.toaster.showSuccess(res.messages.join(", "));
          this.getAICityDocuments();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        }
      },
      error: () => {
        this.saveDocumentLoader = false;
      }
    });
  }

<<<<<<< HEAD
  deleteDocument(payload: DeleteCountryDocumentRequestDto) {
    this.aiComputationService.deleteDocument(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.getAICountryPillarDocuments(false);
          this.getAICountryDocuments();
=======
  deleteDocument(payload: DeleteCityDocumentRequestDto) {
    this.aiComputationService.deleteDocument(payload).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.getAICityPillarDocuments(false);
          this.getAICityDocuments();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          this.toaster.showSuccess(res.messages.join(", "))
        }
      }
    });
  }

<<<<<<< HEAD
  downloadDocument(request: GetCountryPillarDocumentResponseDto) {
    this.aiComputationService.downloadDocument(request.countryDocumentID).subscribe({
=======
  downloadDocument(request: GetCityPillarDocumentResponseDto) {
    this.aiComputationService.downloadDocument(request.cityDocumentID).subscribe({
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      next: (blob) => {
        if (blob.size > 0) {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${request.fileName} ${new Date().toISOString().split('T')[0]}.${request.fileType}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          this.toaster.showSuccess('Report generated successfully');
        } else {
          this.toaster.showWarning(
            'No data available for the selected country or the PDF could not be generated.'
          );
        }
      },
      error: () => {
        this.toaster.showError('There is an error occured, please try again');
      }
    });
  }

  onDeleteClick(doc: any) {
    this.selectedDoc = doc;
    this.opendialog();
  }

  opendialog() {
    this.isDeletePromptOpen = true;
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
    const homeTab = document.querySelector('#pills-home-tab') as HTMLElement;
    if (homeTab) {
      homeTab.click();
    }
    const modalEl = document.getElementById('exampleModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance)
      modalInstance.hide();
    this.isDeletePromptOpen = false;
  }

  onConfirmDelete() {
    if (!this.selectedDoc) return;
    this.deleteDocument(this.selectedDoc);
    this.isDeletePromptOpen = false;
    this.selectedDoc = null;
    this.closeModal();
  }

  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.layerCode?.toLowerCase().includes(term) ||
      item.layerName?.toLowerCase().includes(term)
    );
  }
  formatFileSize(size: number): string {
    return (size / 1024).toFixed(1) + ' KB';
  }
}

