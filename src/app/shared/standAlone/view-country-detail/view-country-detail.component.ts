import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AiCountrySummeryDto } from 'src/app/core/models/aiVm/AiCountrySummeryDto';
import { environment } from 'src/environments/environment';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
  ApexLegend
} from "ng-apexcharts";
import { CommonModule } from '@angular/common';
import { TypingTextComponent } from 'src/app/shared/standAlone/typing-text/typing-text.component';
import { SharedModule } from 'src/app/shared/share.module';
import { CircularScoreComponent } from 'src/app/shared/standAlone/circular-score/circular-score.component';
import { SparklineScoreComponent } from 'src/app/shared/standAlone/sparkline-score/sparkline-score.component';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from 'src/app/core/services/user.service';
import { UserRole } from 'src/app/core/enums/UserRole';
import { AiEditToolbarComponent } from 'src/app/shared/standAlone/ai-edit-toolbar/ai-edit-toolbar.component';
import { AiEditableFieldComponent } from 'src/app/shared/standAlone/ai-editable-field/ai-editable-field.component';
import { AiEditableFieldConfig, UpdateAICountryScoreDto } from 'src/app/core/models/aiVm/UpdateAiScoreDtos';
import { AiComputationService } from 'src/app/core/services/ai-computation.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { FormsModule } from '@angular/forms';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
};

const COUNTRY_EVIDENCE_FIELDS: AiEditableFieldConfig[] = [
  { key: 'keyDevelopments', label: 'Key Developments', type: 'textarea', showInTable: true },
  { key: 'criticalRisks', label: 'Critical Risks', type: 'textarea', showInTable: true },
  { key: 'gaps', label: 'Gaps', type: 'textarea', showInTable: true },
  { key: 'structuralEvidence', label: 'Structural Evidence', type: 'textarea', showInTable: true },
  { key: 'operationalEvidence', label: 'Operational Evidence', type: 'textarea', showInTable: true },
  { key: 'outcomeEvidence', label: 'Outcome Evidence', type: 'textarea', showInTable: true },
  { key: 'perceptionEvidence', label: 'Perception Evidence', type: 'textarea', showInTable: true },
  { key: 'temporalScope', label: 'Temporal Scope', type: 'textarea', showInTable: true },
  { key: 'distortionScreening', label: 'Distortion Screening', type: 'textarea', showInTable: true },
  { key: 'politicalShock', label: 'Political Shock', type: 'textarea', showInTable: true },
  { key: 'economicShock', label: 'Economic Shock', type: 'textarea', showInTable: true },
  { key: 'narrativeShock', label: 'Narrative Shock', type: 'textarea', showInTable: true },
  { key: 'stressScoreAdjustment', label: 'Stress Score Adjustment', type: 'textarea', showInTable: true },
  { key: 'inequalityAdjustment', label: 'Inequality Adjustment', type: 'textarea', showInTable: true },
  { key: 'opacityRisk', label: 'Opacity Risk', type: 'textarea', showInTable: true },
  { key: 'nonCompensationNote', label: 'Non Compensation Note', type: 'textarea', showInTable: true },
  { key: 'relationalIntegrity', label: 'Relational Integrity', type: 'textarea', showInTable: true },
  { key: 'institutionalCapacity', label: 'Institutional Capacity', type: 'textarea', showInTable: true },
  { key: 'primarySource', label: 'Primary Source', type: 'textarea', showInTable: true },
  { key: 'crossPillarPatterns', label: 'Cross Pillar Patterns', type: 'textarea', showInTable: true },
  { key: 'equityAssessment', label: 'Equity Assessment', type: 'textarea', showInTable: true },
  { key: 'conflictRiskOutlook', label: 'Conflict Risk Outlook', type: 'textarea', showInTable: true },
  { key: 'strategicRecommendation', label: 'Strategic Recommendation', type: 'textarea', showInTable: true },
  { key: 'dataTransparencyNote', label: 'Data Transparency Note', type: 'textarea', showInTable: true },
];

@Component({
  selector: 'app-view-country-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TypingTextComponent,
    SharedModule,
    CircularScoreComponent,
    SparklineScoreComponent,
    MatTooltipModule,
    AiEditToolbarComponent,
    AiEditableFieldComponent
  ],
  templateUrl: './view-country-detail.component.html',
  styleUrl: './view-country-detail.component.css'
})
export class ViewCountryDetailComponent implements OnChanges {
  @Input() country?: AiCountrySummeryDto | null = null;
  @Output() dataSaved = new EventEmitter<void>();
  @Output() closeSidebar?: boolean | null = null;

  urlBase = environment.apiUrl;
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;

  router = inject(Router);
  userService = inject(UserService);
  aiComputationService = inject(AiComputationService);
  toaster = inject(ToasterService);

  editMode = false;
  saving = false;
  draft: Record<string, string | number | null> = {};
  evidenceFields = COUNTRY_EVIDENCE_FIELDS;

  get canEdit(): boolean {
    const role = this.userService.userInfo?.role;
    return role === UserRole.Admin || role === UserRole.Analyst;
  }

  get averageProgress(): number {
    return (((this.getDraftNumber('aiProgress') ?? this.country?.aiProgress ?? 0) +
      (this.getDraftNumber('evaluatorScore') ?? this.country?.evaluatorScore ?? 0)) / 2);
  }

  get discrepancy(): number {
    const ai = this.getDraftNumber('aiProgress') ?? this.country?.aiProgress ?? 0;
    const evaluator = this.getDraftNumber('evaluatorScore') ?? this.country?.evaluatorScore ?? 0;
    return Math.abs(evaluator - ai);
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/Frame 1321315029.png';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['country']) {
      this.editMode = false;
      this.resetDraft();
    }
    this.ApexGetPieOptions();
  }

  viewPillars() {
    this.router.navigate([`/${this.userService.userInfo?.role?.toLowerCase()}/ai/kpi-analysis`], {
      queryParams: {
        countryID: this.country?.countryID,
        year: this.country?.year
      }
    });
  }

  startEdit() {
    this.resetDraft();
    this.editMode = true;
    this.ApexGetPieOptions();
  }

  cancelEdit() {
    this.editMode = false;
    this.resetDraft();
    this.ApexGetPieOptions();
  }

  saveChanges() {
    if (!this.country) {
      return;
    }

    const payload: UpdateAICountryScoreDto = {
      countryID: this.country.countryID,
      year: this.country.year,
      confidenceLevel: this.getDraftString('confidenceLevel'),
      immediateSituationSummary: this.getDraftString('immediateSituationSummary'),
      evidenceSummary: this.getDraftString('evidenceSummary'),
      keyDevelopments: this.getDraftString('keyDevelopments'),
      criticalRisks: this.getDraftString('criticalRisks'),
      gaps: this.getDraftString('gaps'),
      structuralEvidence: this.getDraftString('structuralEvidence'),
      operationalEvidence: this.getDraftString('operationalEvidence'),
      outcomeEvidence: this.getDraftString('outcomeEvidence'),
      perceptionEvidence: this.getDraftString('perceptionEvidence'),
      temporalScope: this.getDraftString('temporalScope'),
      distortionScreening: this.getDraftString('distortionScreening'),
      politicalShock: this.getDraftString('politicalShock'),
      economicShock: this.getDraftString('economicShock'),
      narrativeShock: this.getDraftString('narrativeShock'),
      stressScoreAdjustment: this.getDraftString('stressScoreAdjustment'),
      inequalityAdjustment: this.getDraftString('inequalityAdjustment'),
      opacityRisk: this.getDraftString('opacityRisk'),
      nonCompensationNote: this.getDraftString('nonCompensationNote'),
      relationalIntegrity: this.getDraftString('relationalIntegrity'),
      institutionalCapacity: this.getDraftString('institutionalCapacity'),
      primarySource: this.getDraftString('primarySource'),
      crossPillarPatterns: this.getDraftString('crossPillarPatterns'),
      equityAssessment: this.getDraftString('equityAssessment'),
      conflictRiskOutlook: this.getDraftString('conflictRiskOutlook'),
      strategicRecommendation: this.getDraftString('strategicRecommendation'),
      dataTransparencyNote: this.getDraftString('dataTransparencyNote'),
    };

    this.saving = true;
    this.aiComputationService.updateAICountryScore(payload).subscribe({
      next: (res) => {
        this.saving = false;
        if (res.succeeded) {
          this.applyDraftToCountry();
          this.editMode = false;
          this.ApexGetPieOptions();
          this.toaster.showSuccess(res.messages?.join(', ') || 'Changes saved successfully.');
          this.dataSaved.emit();
        } else {
          this.toaster.showError(res.errors?.join(', ') || 'Failed to save changes.');
        }
      },
      error: () => {
        this.saving = false;
        this.toaster.showError('Failed to save changes. Please try again.');
      }
    });
  }

  getFieldValue(key: string): string | number | null {
    if (this.editMode && key in this.draft) {
      return this.draft[key];
    }
    return (this.country as any)?.[key] ?? null;
  }

  setFieldValue(key: string, value: string | number | null) {
    this.draft[key] = value;
    if (key === 'aiProgress' || key === 'evaluatorScore') {
      this.ApexGetPieOptions();
    }
  }
  getExecutiveSummery(){

    let immediate = this.getFieldValue('immediateSituationSummary');
    let countryScoreSummery = this.getFieldValue('countryScoreSummery');
    let evidenceSummary = this.getFieldValue('evidenceSummary');

    let summary =  immediate + '\n\n'+ countryScoreSummery + ' ' + evidenceSummary
    return summary
  }

  shouldShowEvidenceRow(field: AiEditableFieldConfig): boolean {
    if (this.editMode) {
      return true;
    }
    const value = this.getFieldValue(field.key);
    return value !== null && value !== undefined && String(value).trim() !== '';
  }

  private resetDraft() {
    if (!this.country) {
      this.draft = {};
      return;
    }

    this.draft = {
      aiProgress: this.country.aiProgress ?? null,
      evaluatorScore: this.country.evaluatorScore ?? null,
      confidenceLevel: this.country.confidenceLevel ?? null,
      evidenceSummary: this.country.evidenceSummary ?? null,
    };

    this.evidenceFields.forEach(field => {
      this.draft[field.key] = (this.country as any)?.[field.key] ?? null;
    });
  }

  private applyDraftToCountry() {
    if (!this.country) {
      return;
    }

    Object.keys(this.draft).forEach(key => {
      (this.country as any)[key] = this.draft[key];
    });
    this.country.discrepancy = this.discrepancy;
  }

  private getDraftString(key: string): string | null {
    const value = this.draft[key];
    if (value === null || value === undefined || value === '') {
      return null;
    }
    return String(value);
  }

  private getDraftNumber(key: string): number | null {
    const value = this.draft[key];
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }

  ApexGetPieOptions() {
    const aiProgress = this.getDraftNumber('aiProgress') ?? this.country?.aiProgress ?? 0;
    const evaluatorProgress = this.getDraftNumber('evaluatorScore') ?? this.country?.evaluatorScore ?? 0;
    const discrepancy = this.discrepancy;
    const avgProgress = this.averageProgress;

    this.chartOptions = {
      series: [
        aiProgress,
        evaluatorProgress,
        discrepancy,
        avgProgress
      ],
      chart: {
        height: 380,
        type: "radialBar",
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: 20,
          endAngle: 300,
          offsetY: 80,
          offsetX: 20,
          hollow: {
            margin: 0,
            size: "40%",
            background: "#25453f0d",
            image: undefined,
            position: "front",
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              offsetY: -10,
            },
            value: {
              show: true,
              offsetY: 10,
              formatter: (value: number) => {
                const v = Number(value);
                return isNaN(v) ? '0.00' : v.toFixed(2);
              }
            },
            total: {
              show: true,
              label: "Avg Progress",
              formatter: () => `${avgProgress.toFixed(2)}`,
            }
          }
        }
      },
      colors: ["#51eea5", "#486363", "#383836d9", "#099176"],
      labels: ["AI Progress", "Evaluator Progress", "Discrepancy", "Avg Progress"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 10,
        offsetY: -10,
        labels: {
          useSeriesColors: true
        },
        formatter: function (seriesName: any, opts: any) {
          return seriesName + ":  " + `${((opts.w.globals.series[opts.seriesIndex])).toFixed(2)}`;
        },
        itemMargin: {
          horizontal: 3
        }
      }
    };
  }
}
