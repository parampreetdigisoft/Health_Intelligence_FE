import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationUserRequest } from 'src/app/core/models/PaginationRequest';
import { PaginationResponse } from 'src/app/core/models/PaginationResponse';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { CountryVM } from 'src/app/core/models/CountryVM';
import { AnalystService } from '../../analyst.service';
import { UserService } from 'src/app/core/services/user.service';
import { SortDirection } from 'src/app/core/enums/SortDirection';
import { DownloadReportDto } from 'src/app/core/models/aiVm/downloadReportDto';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { DocumentFormat } from 'src/app/core/enums/DocumentFormat';

@Component({
  selector: 'app-assigned-country',
  templateUrl: './assigned-country.component.html',
  styleUrl: './assigned-country.component.css'
})
export class AssignedCountryComponent implements OnInit, OnDestroy {
  countriesResponse: PaginationResponse<CountryVM> | undefined;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  isLoader: boolean = false;
  selectedCountries: CountryVM[] = [];
  isExporting: boolean = false;

  // Track selected IDs in a Set for O(1) lookup
  private selectedCountryIds = new Set<number>();

  constructor(
    private analystService: AnalystService,
    private userService: UserService,
    private toaster: ToasterService,
    private aiComputationService: AiComputationService
  ) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getCountries();
  }

  // ─── Computed: are ALL countries on current page selected? ───────────────────
  get isAllCurrentPageSelected(): boolean {
    const currentData = this.countriesResponse?.data ?? [];
    return (
      currentData.length > 0 &&
      currentData.every(country => this.selectedCountryIds.has(country.countryID))
    );
  }

  // ─── Computed: are SOME (but not all) countries on current page selected? ────
  get isSomeCurrentPageSelected(): boolean {
    const currentData = this.countriesResponse?.data ?? [];
    return (
      currentData.some(country => this.selectedCountryIds.has(country.countryID)) &&
      !this.isAllCurrentPageSelected
    );
  }

  // ─── Fetch page ────────────────────────────────────────────────────────────
  getCountries(currentPage: number = 1) {
    this.countriesResponse = undefined;
    this.isLoader = true;

    const payload: PaginationUserRequest = {
      sortDirection: SortDirection.DESC,
      sortBy: 'score',
      pageNumber: currentPage,
      pageSize: this.pageSize,
      userId: this.userService?.userInfo?.userID
    };

    this.analystService.getCountries(payload).subscribe(countries => {
      this.totalRecords = countries.totalRecords;
      this.currentPage = currentPage;
      this.pageSize = countries.pageSize;
      this.isLoader = false;

      // ✅ Restore selection state for countries on this page
      countries.data.forEach(country => {
        country.selected = this.selectedCountryIds.has(country.countryID);
      });

      this.countriesResponse = countries;
    });
  }

  // ─── Select / Deselect ALL on current page ────────────────────────────────
  AllCountrySelected(event: any) {
    const isChecked = event.target.checked;
    const currentData = this.countriesResponse?.data ?? [];

    if (isChecked) {
      currentData.forEach(country => {
        country.selected = true;
        if (!this.selectedCountryIds.has(country.countryID)) {
          this.selectedCountryIds.add(country.countryID);
          this.selectedCountries.push(country);
        }
      });
    } else {
      currentData.forEach(country => {
        country.selected = false;
        this.selectedCountryIds.delete(country.countryID);
      });
      const currentIds = new Set(currentData.map(c => c.countryID));
      this.selectedCountries = this.selectedCountries.filter(
        c => !currentIds.has(c.countryID)
      );
    }
  }

  CountrySelected(event: any, country: CountryVM) {
    const isChecked = event.target.checked;
    country.selected = isChecked;

    if (isChecked) {
      if (!this.selectedCountryIds.has(country.countryID)) {
        this.selectedCountryIds.add(country.countryID);
        this.selectedCountries.push(country);
      }
    } else {
      this.selectedCountryIds.delete(country.countryID);
      this.selectedCountries = this.selectedCountries.filter(
        c => c.countryID !== country.countryID
      );
    }
  }

  // aiAllCountryDetailsReport(format: string = 'pdf') {

  //   if (!this.selectedCountries.length) {
  //     this.toaster.showWarning('Please select at least one country to export the report.');
  //     return;
  //   }

  //   this.isExporting = true;

  //   const payload: DownloadReportDto = {
  //     countryIDs: this.selectedCountries.map(x => x.countryID),
  //     format: format
  //   };

  //   this.aiComputationService.aiAllCountryDetailsReport(payload).subscribe({
  //     next: (blob) => {
  //       this.isExporting = false;
  //       if (blob.size > 0) {
  //         const ext = format == DocumentFormat.Pdf ? 'pdf' : 'docx';

  //         const url = window.URL.createObjectURL(blob);
  //         const link = document.createElement('a');
  //         link.href = url;
  //         link.download = `All_Countries_Details_${new Date().toISOString().split('T')[0]}..${ext}`;
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //         window.URL.revokeObjectURL(url);
  //         this.toaster.showSuccess('Report generated successfully');
  //       } else {
  //         this.toaster.showWarning(
  //           'No data available for the selected country or the PDF could not be generated.'
  //         );
  //       }
  //     },
  //     error: () => {
  //       this.toaster.showError('There is an error occured, please try again');
  //       this.isExporting = false;
  //     }
  //   });
  // }
}