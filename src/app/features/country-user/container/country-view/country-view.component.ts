import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationUserRequest } from 'src/app/core/models/PaginationRequest';
import { CountryVM } from '../../../../core/models/CountryVM';
import { PaginationResponse } from 'src/app/core/models/PaginationResponse';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserService } from 'src/app/core/services/user.service';
import { SortDirection } from 'src/app/core/enums/SortDirection';
import { environment } from 'src/environments/environment';
import { CountryUserService } from '../../country-user.service';
import { Router } from '@angular/router';
import { UserDataShareService } from '../../../../core/services/user-data-share.service';
import { TieredAccessPlanValue } from 'src/app/core/enums/TieredAccessPlan';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { DownloadReportDto } from 'src/app/core/models/aiVm/downloadReportDto';
import { DocumentFormat } from 'src/app/core/enums/DocumentFormat';
declare var bootstrap: any;
@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrl: './country-view.component.css'
})
export class CountryViewComponent {
  urlBase = environment.apiUrl;
  selectedCountry: CountryVM | null | undefined = null;
  countriesResponse: PaginationResponse<CountryVM> | undefined;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  loading: boolean = false;
  isLoader: boolean = false;
  isOpendialog = false;
  selectedCountries: CountryVM[] = [];
  countries: CountryVM[] = [];
  tier: TieredAccessPlanValue = TieredAccessPlanValue.Pending;
  isExporting: boolean = false;
  private selectedCountryIds = new Set<number>();

  constructor(private countryUserService: CountryUserService, private toaster: ToasterService,
    private userService: UserService, private router: Router, private userDataService: UserDataShareService, private aiComputationService: AiComputationService) {
    this.tier = this.userService?.userInfo?.tier || 0;
  }

  ngOnInit(): void {
    this.getCountries(1);
  }

  getCountries(currentPage: any = 1) {
    this.countriesResponse = undefined;
    this.isLoader = true;
    let payload: PaginationUserRequest = {
      sortDirection: SortDirection.DESC,
      sortBy: 'score',
      pageNumber: currentPage,
      pageSize: this.pageSize,
      userId: this.userService?.userInfo?.userID
    }

    this.countryUserService.getCountries(payload).subscribe(countries => {
      this.countriesResponse = countries;
      this.totalRecords = countries.totalRecords;
      this.currentPage = currentPage;
      this.pageSize = countries.pageSize;
      this.isLoader = false;
    });

  }
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


  ngOnDestroy(): void {

  }

  viewDetails(country: CountryVM) {
    this.userDataService.country.set(country);
    this.router.navigate(['countryuser/country-details']);
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

  isCountrySelected(country: CountryVM): boolean {
    return this.selectedCountries.some(x => x.countryID === country.countryID);
  }
  gotoComparision() {
    this.userDataService.compareCountry.set(this.selectedCountries);
    this.router.navigate(['/countryuser/comparision']);
  }

  aiAllCountryDetailsReport(format: string = 'pdf') {
  
      if (!this.selectedCountries.length) {
        this.toaster.showWarning('Please select at least one country');
        return;
      }
  
      this.isExporting = true;
  
      const payload: DownloadReportDto = {
        countryIDs: this.selectedCountries.map(x => x.countryID),
        format: format
      };
  
      this.aiComputationService.aiAllCountryDetailsReport(payload).subscribe({
        next: (blob) => {
          this.isExporting = false;
          if (blob.size > 0) {
            const ext = format == DocumentFormat.Pdf ? 'pdf' : 'docx';
  
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `All_Countries_Details_${new Date().toISOString().split('T')[0]}..${ext}`;
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
          this.isExporting = false;
        }
      });
    }

}
