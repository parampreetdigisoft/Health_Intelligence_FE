import { Component, OnInit, ViewChild } from "@angular/core";
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexYAxis, ApexStroke, ApexTooltip, ApexDataLabels, ChartComponent, ApexGrid, ApexLegend, ApexMarkers } from "ng-apexcharts";
import { Subject, debounceTime } from "rxjs";
<<<<<<< HEAD
import { CountryVM } from "src/app/core/models/CountryVM";
import { CompareCountryRequestDto } from "src/app/core/models/CompareCountryRequestDto";
import { CompareCountryResponseDto, ChartTableRowDto } from "src/app/core/models/CompareCountryResponseDto";
=======
import { CityVM } from "src/app/core/models/CityVM";
import { CompareCityRequestDto } from "src/app/core/models/CompareCityRequestDto";
import { CompareCityResponseDto, ChartTableRowDto } from "src/app/core/models/CompareCityResponseDto";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { AnalyticalLayerResponseDto } from "src/app/core/models/GetAnalyticalLayerResultDto";
import { PillarsVM } from "src/app/core/models/PillersVM";
import { CommonService } from "src/app/core/services/common.service";
import { ToasterService } from "src/app/core/services/toaster.service";
import { UserService } from "src/app/core/services/user.service";
import { environment } from "src/environments/environment";
import { AnalystService } from "../../analyst.service";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/share.module";
import { CircularScoreComponent } from "src/app/shared/standAlone/circular-score/circular-score.component";
import { AiButtonComponent } from "src/app/shared/standAlone/ai-button/ai-button.component";
import { GetMutiplekpiLayerResultsDto } from "src/app/core/models/aiVm/GetMutiplekpiLayerResultsDto";
import { GetMutiplekpiLayerRequestDto } from "src/app/core/models/aiVm/GetMutiplekpiLayerRequestDto";
<<<<<<< HEAD
import {  CompareCountryKpiDetailComponent } from "src/app/shared/standAlone/compare-country-kpi-detail/compare-country-kpi-detail.component";
=======
import { CompareCityKpiDetailComponent } from "src/app/shared/standAlone/compare-city-kpi-detail/compare-city-kpi-detail.component";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
declare var bootstrap: any; // 👈 use Bootstrap JS API
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  legend: ApexLegend;
  grid: ApexGrid;

};

@Component({
  standalone: true,
  selector: 'app-kpi-comparision',
  templateUrl: './kpi-comparision.component.html',
  styleUrl: './kpi-comparision.component.css',
<<<<<<< HEAD
  imports: [CommonModule, SharedModule, CircularScoreComponent,AiButtonComponent,CompareCountryKpiDetailComponent]
=======
  imports: [CommonModule, SharedModule, CircularScoreComponent,AiButtonComponent,CompareCityKpiDetailComponent]
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
})
export class KpiComparisionComponent implements OnInit {
  selectedYear = new Date().getFullYear();
  pillers: PillarsVM[] = [];
<<<<<<< HEAD
  selectedCountries: number[] = [];
  selectedKpis: number[] = [];
  countries: CountryVM[] | null = [];
=======
  selectedCities: number[] = [];
  selectedKpis: number[] = [];
  cities: CityVM[] | null = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  pageSize: number = 10;
  currentPage: number = 1;
  totalRecords: number = 10;
  kpis: AnalyticalLayerResponseDto[] = [];
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {};
<<<<<<< HEAD
  compareCountryResponseDto: CompareCountryResponseDto | null = null;
=======
  compareCityResponseDto: CompareCityResponseDto | null = null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  isLoader: boolean = false;
  environment = environment.apiUrl;
  chartTableData: ChartTableRowDto[] = [];
  $kpiChanged = new Subject();
  isAiViewEnabled: boolean = false;
<<<<<<< HEAD
  mutipleCountrykpiLayerResults: GetMutiplekpiLayerResultsDto | null = null;
=======
  mutipleCitykpiLayerResults: GetMutiplekpiLayerResultsDto | null = null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  viewDetailIndex = -1;
  constructor(
    private analystService: AnalystService,
    private toaster: ToasterService,
    private userService: UserService,
    public commonService: CommonService
  ) {

  }

  ngOnInit(): void {
    this.isLoader = true;
    this.GetAllKpi();
<<<<<<< HEAD
    this.getCountryUserCountries();
    this.$kpiChanged.pipe(debounceTime(1000)).subscribe(x => {
      this.compareCountries();
=======
    this.getCityUserCities();
    this.$kpiChanged.pipe(debounceTime(1000)).subscribe(x => {
      this.compareCities();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    });
  }
  onAiViewToggle(value: boolean) {
    this.isAiViewEnabled = value; // 👈 REQUIRED
    this.getChartOptions();
  }
  kpiChanged() {
    this.$kpiChanged.next(true);
  }
  GetAllKpi() {
    this.analystService.GetAllKpi().subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.kpis = res.result ?? [];
          this.totalRecords = this.kpis.length;
        }
      }
    });
  }
<<<<<<< HEAD
  getCountryUserCountries() {
    this.analystService.getAllCountriesByUserId(this.userService.userInfo.userID ?? 0).subscribe((p) => {
      this.isLoader = false;
      this.countries = p.result || [];
      if (this.countries?.length && this.selectedCountries.length < 2) {
        this.selectedCountries = this.countries.slice(0, 2).map(x => x.countryID);
        this.compareCountries();
=======
  getCityUserCities() {
    this.analystService.getAllCitiesByUserId(this.userService.userInfo.userID ?? 0).subscribe((p) => {
      this.isLoader = false;
      this.cities = p.result || [];
      if (this.cities?.length && this.selectedCities.length < 2) {
        this.selectedCities = this.cities.slice(0, 2).map(x => x.cityID);
        this.compareCities();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      }
    });
  }
  getMutiplekpiLayerResults(layerID: number, viewDetailIndex:number) {

<<<<<<< HEAD
    if (this.selectedCountries.length < 1) {
      this.compareCountryResponseDto = null;
      this.getChartOptions();
      this.toaster.showWarning("Please select at least one country to view data.");
=======
    if (this.selectedCities.length < 1) {
      this.compareCityResponseDto = null;
      this.getChartOptions();
      this.toaster.showWarning("Please select at least one city to view data.");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      return;
    }

    this.viewDetailIndex = viewDetailIndex;

    let payload: GetMutiplekpiLayerRequestDto = {
<<<<<<< HEAD
      countryIDs: this.selectedCountries,
=======
      cityIDs: this.selectedCities,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      year: this.selectedYear,
      layerID: layerID
    }
    this.analystService.getMutiplekpiLayerResults(payload).subscribe({
      next: (res) => {
        this.viewDetailIndex = -1;
        if (res.succeeded) {
<<<<<<< HEAD
          this.mutipleCountrykpiLayerResults = res.result || null;
=======
          this.mutipleCitykpiLayerResults = res.result || null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          const sidebarEl = document.getElementById('kpiLayerSidebar');
          const offcanvas = new bootstrap.Offcanvas(sidebarEl);
          offcanvas.show();
        }
        else {
<<<<<<< HEAD
          this.toaster.showInfo("No comparison data available for the selected countries.");
=======
          this.toaster.showInfo("No comparison data available for the selected cities.");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        }
      },
      error: (err) => {
        this.viewDetailIndex = -1;
        this.toaster.showError("Failed to load comparison data.");
      }
    });
  }
<<<<<<< HEAD
  compareCountries(currentPage = 1) {
    if (this.selectedCountries.length < 1) {
      this.compareCountryResponseDto = null;
      this.getChartOptions();
      this.toaster.showWarning("Please select at least one country to view data.");
=======
  compareCities(currentPage = 1) {
    if (this.selectedCities.length < 1) {
      this.compareCityResponseDto = null;
      this.getChartOptions();
      this.toaster.showWarning("Please select at least one city to view data.");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      return;
    }
    this.isLoader = true;
    this.currentPage = currentPage;

<<<<<<< HEAD
    let payload: CompareCountryRequestDto = {
      countries: this.selectedCountries,
=======
    let payload: CompareCityRequestDto = {
      cities: this.selectedCities,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      pageNumber: this.currentPage,
      pageSize: this.pageSize,
      Kpis: this.selectedKpis
    }
<<<<<<< HEAD
    this.analystService.compareCountries(payload).subscribe({
      next: (res) => {
        this.isLoader = false;
        if (res.succeeded) {
          this.compareCountryResponseDto = res.result || null;
          this.getChartOptions();
        }
        else {
          this.toaster.showInfo("No comparison data available for the selected countries.");
=======
    this.analystService.compareCities(payload).subscribe({
      next: (res) => {
        this.isLoader = false;
        if (res.succeeded) {
          this.compareCityResponseDto = res.result || null;
          this.getChartOptions();
        }
        else {
          this.toaster.showInfo("No comparison data available for the selected cities.");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        }
      },
      error: (err) => {
        this.isLoader = false;
        this.toaster.showError("Failed to load comparison data.");
      }
    });
  }

  getChartOptions() {
<<<<<<< HEAD
    this.chartTableData = this.compareCountryResponseDto?.tableData ?? [];
=======
    this.chartTableData = this.compareCityResponseDto?.tableData ?? [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

    if (!this.chartTableData?.length) {
      this.totalRecords = 0;
    } else {
      this.totalRecords = this.kpis.length;
    }

    const kpiMap = new Map(
      this.chartTableData.map(x => [x.layerCode, x.layerName])
    );

    const colorPalette = this.commonService.kpiColors;
    
    let series: any[] = [];
    let strokeDashArray: number[] = [];

<<<<<<< HEAD
    (this.compareCountryResponseDto?.series ?? []).forEach((countryData, index) => {
      // Skip the last country if AI View is enabled (assuming last country is AI benchmark)
      if (index === (this.compareCountryResponseDto?.series ?? []).length - 1 && this.isAiViewEnabled) {
=======
    (this.compareCityResponseDto?.series ?? []).forEach((cityData, index) => {
      // Skip the last city if AI View is enabled (assuming last city is AI benchmark)
      if (index === (this.compareCityResponseDto?.series ?? []).length - 1 && this.isAiViewEnabled) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        return;
      }

      const baseColor = colorPalette[index % colorPalette.length];

      // Evaluation series (solid line)
      series.push({
<<<<<<< HEAD
        name: `${countryData.name} (Evaluation)`,
        data: countryData.data,
=======
        name: `${cityData.name} (Evaluation)`,
        data: cityData.data,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        color: baseColor,
        type: 'line'
      });
      strokeDashArray.push(0); // Solid line

      // AI series (dashed line) - only if AI view is enabled
<<<<<<< HEAD
      if (this.isAiViewEnabled && countryData.aiData) {
        series.push({
          name: `${countryData.name} (AI)`,
          data: countryData.aiData,
=======
      if (this.isAiViewEnabled && cityData.aiData) {
        series.push({
          name: `${cityData.name} (AI)`,
          data: cityData.aiData,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          color: this.lightenColor(baseColor, 20), // Slightly lighter shade
          type: 'line'
        });
        strokeDashArray.push(8); // Dashed line
      }
    });

    let option: Partial<ChartOptions> = {
      series: series,
      chart: {
       height: 400,
        type: "line",
        zoom: {
          enabled: false,
          type: 'x'
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        } as any
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3,
        dashArray: strokeDashArray // Different dash patterns for each series
      },
      markers: {
        size: 5,
        strokeWidth: 2,
        hover: {
          size: 7,
          sizeOffset: 3
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        fontSize: '13px',
        fontWeight: 500,
        markers: {
          width: 20,
          height: 3,
          radius: 0
        } as any,
        itemMargin: {
          horizontal: 15,
          vertical: 5
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        }
      },
      grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 3,
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 10
        }
      },
      xaxis: {
        type: "category",
<<<<<<< HEAD
        categories: this.compareCountryResponseDto?.categories,
=======
        categories: this.compareCityResponseDto?.categories,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        labels: {
          rotate: -15,
          rotateAlways: true,
          style: {
            fontSize: '11px',
            fontWeight: 500
          },
          trim: false
        },
        tooltip: {
          enabled: false
        },
        axisBorder: {
          show: true,
          color: '#78909C'
        },
        axisTicks: {
          show: true,
          color: '#78909C'
        }
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 10,
        forceNiceScale: true,
        decimalsInFloat: 0,
        labels: {
          show: true,
          formatter: (val: number) => parseInt(val.toString(), 10).toString(),
          style: {
            fontSize: '12px',
            fontWeight: 500
          }
        },
        title: {
          text: "Score Difference",
          style: {
            fontSize: '14px',
            fontWeight: 600,
            color: '#263238'
          }
        },
        axisBorder: {
          show: true,
          color: '#78909C'
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
<<<<<<< HEAD
          const layerCode = this.compareCountryResponseDto?.categories?.[dataPointIndex] ?? "";
=======
          const layerCode = this.compareCityResponseDto?.categories?.[dataPointIndex] ?? "";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          const layerName = kpiMap.get(layerCode) ?? "";

          let tooltipHtml = `
          <div style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); min-width: 250px;">
            <div style="font-weight: 600; margin-bottom: 10px; color: #333; font-size: 13px; border-bottom: 2px solid #e7e7e7; padding-bottom: 6px;">
              ${layerCode} - ${layerName}
            </div>
        `;

          // Group evaluation and AI values together
<<<<<<< HEAD
          const countries = this.compareCountryResponseDto?.series ?? [];
          countries.forEach((country, idx) => {
            // Skip last country if it's the AI benchmark
            if (idx === countries.length - 1 && this.isAiViewEnabled) {
              return;
            }

            const evalValue = country.data[dataPointIndex];
            const aiValue = country.aiData?.[dataPointIndex];
=======
          const cities = this.compareCityResponseDto?.series ?? [];
          cities.forEach((city, idx) => {
            // Skip last city if it's the AI benchmark
            if (idx === cities.length - 1 && this.isAiViewEnabled) {
              return;
            }

            const evalValue = city.data[dataPointIndex];
            const aiValue = city.aiData?.[dataPointIndex];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
            const color = colorPalette[idx % colorPalette.length];
            const difference = aiValue != null ? (evalValue - aiValue) : 0;

            tooltipHtml += `
            <div style="margin: 8px 0; padding: 8px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 6px; border-left: 3px solid ${color};">
              <div style="font-weight: 600; color: ${color}; margin-bottom: 6px; font-size: 12px;">
<<<<<<< HEAD
                ${country.name}
=======
                ${city.name}
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
                <span style="color: #666;">📊 Evaluation:</span>
                <span style="font-weight: 600; color: #333;">${evalValue.toFixed(2)}</span>
              </div>
          `;

            if (this.isAiViewEnabled && aiValue != null) {
              tooltipHtml += `
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
                <span style="color: #666;">🤖 AI:</span>
                <span style="font-weight: 600; color: #333;">${aiValue.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 6px; padding-top: 6px; border-top: 1px solid #dee2e6;">
                <span style="color: #666;">📈 Difference:</span>
                <span style="font-weight: 600; color: ${Math.abs(difference) > 10 ? '#dc3545' : '#28a745'};">
                  ${difference > 0 ? '+' : ''}${difference.toFixed(2)}
                </span>
              </div>
            `;
            }

            tooltipHtml += `</div>`;
          });

          tooltipHtml += '</div>';
          return tooltipHtml;
        }
      }
    };

    this.chartOptions = option;
  }

  // Helper function to lighten colors for AI lines
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

<<<<<<< HEAD
  getCountryScore(countryID: number, isAi: boolean = false): string {
    const country = this.countries?.find(c => c.countryID === countryID);
    if (isAi) {
      return country?.aiScore?.toFixed(2) || '0';
    }
    return country?.score?.toFixed(2) || '0';
  }

  getCountryImage(countryID: number): string {
    return this.countries?.find(c => c.countryID === countryID)?.image || '';
  }


  getCountryName(countryID: number): string {
    return this.countries?.find(c => c.countryID === countryID)?.countryName || '';
  }

  getCountryContinent(countryID: number): string {
    return this.countries?.find(c => c.countryID === countryID)?.continent || '';
=======
  getCityScore(cityID: number, isAi: boolean = false): string {
    const city = this.cities?.find(c => c.cityID === cityID);
    if (isAi) {
      return city?.aiScore?.toFixed(2) || '0';
    }
    return city?.score?.toFixed(2) || '0';
  }

  getCityImage(cityID: number): string {
    return this.cities?.find(c => c.cityID === cityID)?.image || '';
  }


  getCityCountry(cityID: number): string {
    return this.cities?.find(c => c.cityID === cityID)?.country || '';
  }

  getCityState(cityID: number): string {
    return this.cities?.find(c => c.cityID === cityID)?.state || '';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/Frame 1321315029.png';
  }

  getPeerScore(): string {

    if (!this.chartTableData?.length) return 'NA';

<<<<<<< HEAD
    const peerCountries = this.countries?.filter(country =>
      this.chartTableData[0].countryValues?.some(row => row.countryID === country.countryID)
    ) ?? [];

    const avgPeerCountryScore =
      peerCountries.length > 0
        ? peerCountries.reduce((sum, row) => sum + (row.score ?? 0), 0) / peerCountries.length
        : 0;

    return avgPeerCountryScore.toFixed(2);
=======
    const peerCities = this.cities?.filter(city =>
      this.chartTableData[0].cityValues?.some(row => row.cityID === city.cityID)
    ) ?? [];

    const avgPeerCityScore =
      peerCities.length > 0
        ? peerCities.reduce((sum, row) => sum + (row.score ?? 0), 0) / peerCities.length
        : 0;

    return avgPeerCityScore.toFixed(2);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  }
  customSearchFn(term: string, item: any) {
    term = term.toLowerCase();
    return (
      item.layerCode?.toLowerCase().includes(term) ||
      item.layerName?.toLowerCase().includes(term)
    );
  }
}