import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { PillarsVM } from "src/app/core/models/PillersVM";
import { CountryVM } from "src/app/core/models/CountryVM";
import { UserService } from "src/app/core/services/user.service";
import { CountryMappingPillerRequestDto } from "src/app/core/models/QuestionRequest";
import { GetQuestionByCountryMappingRespones } from "src/app/core/models/QuestonResponse";
import { ToasterService } from "src/app/core/services/toaster.service";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import {
  AddAssessmentDto,
  AddAssessmentResponseDto,
  GetCountryPillarHistoryRequestDto,
} from "src/app/core/models/AssessmentRequest";
import { AnalystService } from "../../analyst.service";
import { environment } from "src/environments/environment";
import { CommonService } from "src/app/core/services/common.service";
import { AiComputationService } from "src/app/core/services/ai-computation.service";
import { AITransferAssessmentRequestDto } from "src/app/core/models/aiVm/AITransferAssessmentRequestDto";
import { finalize } from "rxjs";
import { DocumentFormat } from "src/app/core/enums/DocumentFormat";

@Component({
  selector: "app-analyst-assessment",
  templateUrl: "./analyst-assessment.component.html",
  styleUrls: ["./analyst-assessment.component.css"], // ✅ fixed
})
export class AnalystAssessmentComponent implements OnInit, OnDestroy {
  selectedYear = new Date().getFullYear();
  pillars: PillarsVM[] = [];
  countries: CountryVM[] = []; // ✅ fixed type
  selectedUserCountryMappingID: number = 0;
  pillerQuestions: GetQuestionByCountryMappingRespones | null = null;
  form!: FormGroup;
  pillarDisplayOrder: number = 1;
  selectedPillar?: PillarsVM;
  @ViewChild("scrollContainer") scrollContainer!: ElementRef;
  isloading = false;
  isUploading = false;
  isLoader: boolean = false;
  urlBase = environment.apiUrl;
  isAssessementFinalized = false;
  isAItransfer = false;
  isDownalodingExcel =false;
  constructor(
    private analystService: AnalystService,
    private userService: UserService,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private commonService: CommonService,
    private aiComputationService: AiComputationService
  ) { }

  ngOnInit(): void {
    this.isLoader = true;
    this.formInitialized();
    this.GetAllPillars();
    this.getCountryByUserIdForAssessment();
  }

  get questions() {
    return this.pillerQuestions?.questions ?? [];
  }

  formInitialized() {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  get questionsArray(): FormArray {
    return this.form.get("questions") as FormArray;
  }

  loadQuestions() {
    this.pillerQuestions?.questions.forEach((q) => {
      let option = q.questionOptions.find((x) => x.isSelected);
      this.questionsArray.push(
        this.fb.group({
          questionID: [q.questionID, Validators.required],
          responseID: [q.responseID],
          assessmentID: [this.pillerQuestions?.assessmentID],
          questionOptionID: [
            q.isSelected ? option?.optionID : "",
            Validators.required,
          ],
          score: [q.isSelected ? option?.scoreValue : ""],
          justification: [
            q.isSelected ? option?.justification : "",
            Validators.required,
          ],
          source: [q.isSelected ? option?.source : ""],
          historyQuestionOptionID: [""],
        })
      );
    });
  }

  onOptionChange(event: any, index: number) {
    const optionId = +event.target.value;
    const selectedOption = this.pillerQuestions?.questions[
      index
    ].questionOptions.find((o) => o.optionID === optionId);

    if (selectedOption) {
      const formGroup = this.questionsArray.at(index) as FormGroup;
      formGroup.patchValue({
        questionOptionID: selectedOption.optionID,
        score: selectedOption.scoreValue,
        source: selectedOption.source,
        justification: selectedOption.justification,
        historyQuestionOptionID: ''
      });
    }
  }
  onHistoryOptionChange(event: any, index: number) {
    const userId = +event.target.value;
    const selectedOption = this.pillerQuestions?.questions[
      index
    ].history.find((o) => o.userID === userId);

    if (selectedOption) {
      const formGroup = this.questionsArray.at(index) as FormGroup;
      formGroup.patchValue({
        questionOptionID: selectedOption.optionID,
        score: selectedOption.scoreValue,
        source: selectedOption.source,
        justification: selectedOption.justification,
        historyQuestionOptionID: selectedOption.userID
      });
      this.autoSaveSingleAssessemnt(index);
    }
  }

  GetAllPillars() {
    this.analystService.getAllPillars().subscribe((pillars) => {
      this.pillars = pillars;
    });
  }
  pillarChanged(pillar?: PillarsVM) {
    if (!this.selectedUserCountryMappingID || this.selectedUserCountryMappingID == 0) {
      this.toaster.showWarning("Please select country first");
      return;
    }

    this.isAssessementFinalized = false;
    if (pillar) {
      this.selectedPillar = pillar;
      this.getQuestionsByCountryId();
    }
    else {
      this.selectedPillar = this.pillars.find((x) => x.pillarID == this.pillerQuestions?.pillarID);
      if (this.pillerQuestions && this.pillerQuestions?.submittedPillarDisplayOrder < (this.selectedPillar?.displayOrder ?? 0)) {
        this.pillarDisplayOrder = this.selectedPillar?.displayOrder ?? 1;
      }
    }
  }
  countryChanged() {
    this.selectedPillar = undefined;
    this.getQuestionsByCountryId();
  }

  getCountryByUserIdForAssessment() {
    this.selectedPillar = undefined;
    this.commonService.getUserNearestCountry()
      .subscribe({
        next: (res) => {
          this.countries = res.result ?? [];
          if (this.countries.length > 0) {
            this.selectedUserCountryMappingID = this.analystService.userCountryMappingIDSubject$.value != null ?
              this.analystService.userCountryMappingIDSubject$.value
              : this.countries[0].userCountryMappingID ?? 0;
            setTimeout(() => {
              this.toaster.showInfo("You have rediredected to assgined country, please submit all pillars for the country");
            }, 1000);
            this.getQuestionsByCountryId();
          } else {
            this.toaster.showWarning(res.errors.join(", "));
          }
        },
        error: () => {
          this.toaster.showWarning("There is an error please try again");
        },
      });
  }

  getQuestionsByCountryId() {
    if (
      !this.selectedUserCountryMappingID ||
      this.selectedUserCountryMappingID == 0
    ) {
      this.toaster.showWarning("Please select country first");
      return;
    }
    this.formInitialized();
    const payload: CountryMappingPillerRequestDto = {
      userCountryMappingID: this.selectedUserCountryMappingID ?? 0,
    };
    if (this.selectedPillar) {
      payload.pillarID = this.selectedPillar.pillarID;
    }
    this.pillerQuestions = null;
    this.isLoader = true;
    this.analystService.getQuestionsByCountryId(payload).subscribe({
      next: (res) => {
        this.isLoader = false;
        if (res.succeeded) {
          this.pillerQuestions = res.result;
          this.pillarDisplayOrder = this.pillerQuestions?.submittedPillarDisplayOrder ?? 1;
          if (this.pillerQuestions && this.pillerQuestions?.assessmentID > 0) {
            this.getAssessmentProgressHistory();
          } else {
            this.userService.assessmentProgress.next(null);
          }
          this.pillarChanged();
          this.loadQuestions();
        } else {
          this.toaster.showWarning("Country's assessment is already submitted");
        }
      },
    });
  }

  SaveAssessment() {
    if (
      !this.selectedUserCountryMappingID ||
      this.selectedUserCountryMappingID == 0
    ) {
      this.toaster.showWarning("Please select country first");
      return;
    }
    const validQuestions = this.questionsArray.controls
      .filter((ctrl) => ctrl.valid)
      .map((ctrl) => ctrl.value as AddAssessmentResponseDto);
    const payload: AddAssessmentDto = {
      userCountryMappingID: this.selectedUserCountryMappingID,
      assessmentID: this.pillerQuestions?.assessmentID ?? 0,
      pillarID: this.pillerQuestions?.pillarID ?? 0,
      responses: validQuestions ?? [],
      isAutoSave: false,
      isFinalized: this.isAssessementFinalized
    };
    if (
      this.pillerQuestions?.pillarID != null &&
      this.pillerQuestions?.pillarID > 0
    ) {
      this.analystService.saveAssessment(payload).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.scrollContainer.nativeElement.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 300);
          if (res.succeeded) {
            if (this.pillerQuestions?.displayOrder == 14 || this.isAssessementFinalized) {
              this.analystService.userCountryMappingIDSubject$.next(null);
              this.getCountryByUserIdForAssessment();
            } else {
              if (this.selectedPillar)
                this.selectedPillar = this.pillars.find(x => x.displayOrder == (Number(this.selectedPillar?.displayOrder) + 1));
              this.getQuestionsByCountryId();
            }
            this.toaster.showSuccess(res.messages.join(", "));
          } else {
            this.toaster.showError(res.errors.join(", "));
          }
        },
        error: () => {
          this.toaster.showError("Failed to save assessment. Try again.");
        },
      });
    } else {
      this.toaster.showWarning("Please refresh the page and try again");
    }
  }

  ngOnDestroy(): void {
    this.userService.assessmentProgress.next(null);
  }

  ImportQuestions() {
    if (this.selectedUserCountryMappingID != 0) {
      this.isDownalodingExcel = true;
      this.analystService
        .ExportQuestions(this.selectedUserCountryMappingID)
        .subscribe({
          next: (res: any) => {
            var country = this.countries?.find(
              (x) => x.userCountryMappingID == this.selectedUserCountryMappingID
            );
            this.isDownalodingExcel = false;
            const url = window.URL.createObjectURL(res);
            const a = document.createElement("a");
            a.href = url;
            a.download =
              country?.countryName + "_" + country?.assignedBy + "_Questions.xlsx";
            a.click();
            this.toaster.showSuccess("Questions downloaded successfully");
          },
          error: () => {
            this.isDownalodingExcel = false;
            this.toaster.showError("failed to download questions try again");
          },
        });
    } else {
      this.toaster.showWarning("Please select country to get questions");
    }
  }

  handleFileUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", this.userService?.userInfo?.userID?.toString());
    this.isUploading = true;
    this.analystService.ImportAssessment(formData).subscribe({
      next: (res) => {
        this.selectedPillar = undefined;
        this.isUploading = false;
        if (res.succeeded) {
          this.getCountryByUserIdForAssessment();
          this.toaster.showSuccess(res.messages.join(", "));
        } else {
          this.toaster.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.isUploading = false;
        this.toaster.showError("failed to download questions try again");
      },
    });
  }
  getAssessmentProgressHistory() {
    this.analystService
      .getAssessmentProgressHistory(this.pillerQuestions?.assessmentID ?? 0)
      .subscribe((res) => {
        if (res.succeeded) {
          this.userService.assessmentProgress.next(res.result);
        } else {
          this.toaster.showError("Failed to fetch assessment progress history");
        }
      });
  }

  autoSaveSingleAssessemnt(index: number) {

    if (this.questionsArray.controls[index].valid) {
      if (!this.selectedUserCountryMappingID || this.selectedUserCountryMappingID == 0) {
        this.toaster.showWarning("Please select country first");
        return;
      }
      if (this.questionsArray.controls[index].valid && this.questionsArray.controls[index].dirty) {

        const payload: AddAssessmentDto = {
          userCountryMappingID: this.selectedUserCountryMappingID,
          assessmentID: this.pillerQuestions?.assessmentID ?? 0,
          pillarID: this.pillerQuestions?.pillarID ?? 0,
          responses: [this.questionsArray.controls[index].value],
          isAutoSave: true,
          isFinalized: false
        };
        this.analystService.saveAssessment(payload).subscribe({
          next: (res) => {
            if (res.succeeded) {
              this.questionsArray.at(index).markAsPristine();
            }
          },
          error: () => {
            this.toaster.showError("Failed to save assessment. Try again.");
          },
        });
      }
    }
  }
  decodeHtml(text: string | undefined): string {
    if (text) {
      const txt = document.createElement('textarea');
      txt.innerHTML = text;
      return txt.value.replace(/\u00a0/g, ' '); // Replace non-breaking space with normal space
    }
    return "";
  }

  aiResultTransfer() {
    const country = this.countries.find(x => x.userCountryMappingID === Number(this.selectedUserCountryMappingID));

    if (!country) {
      this.toaster.showWarning("Please select a country");
      return;
    }

    const payload: AITransferAssessmentRequestDto = {
      countryID: country.countryID,
      transferToUserID: this.userService.userInfo?.userID
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
            this.countryChanged();
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

  downloadQuestions(mode: string) {
    if (mode === 'xlsx') {
      this.ImportQuestions();
    }
    else {
      this.exportPillarsHistoryByUserId('pdf');
    }
  }

  exportPillarsHistoryByUserId(type: 'xlsx' | 'pdf') {
    if (
      this.userService?.userInfo?.userID == null ||
      !this.selectedUserCountryMappingID ||
      this.selectedUserCountryMappingID == 0 ||
      this.selectedUserCountryMappingID == null
    ) {

      this.toaster.showWarning("Please select country to for history");
      return;
    }
    

    const selectedCountry = this.countries.find(
      (x: any) => x.userCountryMappingID == this.selectedUserCountryMappingID
    );

    if (!selectedCountry) {
      this.toaster.showWarning("Please select country to for history");
      return;
    }

    let payload: GetCountryPillarHistoryRequestDto = {
      userID: this.userService?.userInfo?.userID,
      countryID: selectedCountry.countryID,   // ✅ Correct countryID
      updatedAt: this.commonService.getStartOfYearLocal(this.selectedYear),
      exportType: type
    };

    this.isDownalodingExcel =true;

    this.analystService.exportPillarsHistoryByUserId(payload)
    .pipe(finalize(()=> this.isDownalodingExcel =false))
    .subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);

        const a = document.createElement("a");
        a.href = url;
        //exportType:DocumentFormat.Xlsx
        // ✅ Dynamic filename
        a.download = type === 'pdf'
          ? "PillarQuestionHistory.pdf"
          : "PillarQuestionHistory.xlsx";

        a.click();
        window.URL.revokeObjectURL(url);

        this.toaster.showSuccess(`Pillars History ${type.toUpperCase()} downloaded successfully`);
      },
      error: () => {        
        this.toaster.showError("There is an error please try later");
      },
    });
  }
}
