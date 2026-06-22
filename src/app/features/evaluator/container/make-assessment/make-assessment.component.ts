import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { PillarsVM } from "src/app/core/models/PillersVM";
<<<<<<< HEAD
import { CountryVM } from "src/app/core/models/CountryVM";
import { UserService } from "src/app/core/services/user.service";
import { CountryMappingPillerRequestDto } from "src/app/core/models/QuestionRequest";
import { GetQuestionByCountryMappingRespones } from "src/app/core/models/QuestonResponse";
=======
import { CityVM } from "src/app/core/models/CityVM";
import { UserService } from "src/app/core/services/user.service";
import { CityMappingPillerRequestDto } from "src/app/core/models/QuestionRequest";
import { GetQuestionByCityMappingRespones } from "src/app/core/models/QuestonResponse";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { ToasterService } from "src/app/core/services/toaster.service";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import {
  AddAssessmentDto,
  AddAssessmentResponseDto,
} from "src/app/core/models/AssessmentRequest";
import { environment } from "src/environments/environment";
import { EvaluatorService } from "../../evaluator.service";
import { CommonService } from "src/app/core/services/common.service";

@Component({
  selector: "app-make-assessment",
  templateUrl: "./make-assessment.component.html",
  styleUrl: "./make-assessment.component.css",
})
export class MakeAssessmentComponent implements OnInit, OnDestroy {
  pillars: PillarsVM[] = [];
<<<<<<< HEAD
  countries: CountryVM[] = []; // ✅ fixed type
  selectedUserCountryMappingID: number = 0;
  pillerQuestions: GetQuestionByCountryMappingRespones | null = null;
=======
  cities: CityVM[] = []; // ✅ fixed type
  selectedUserCityMappingID: number = 0;
  pillerQuestions: GetQuestionByCityMappingRespones | null = null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  form!: FormGroup;
  pillarDisplayOrder: number = 1;
  selectedPillar?: PillarsVM;
  @ViewChild("scrollContainer") scrollContainer!: ElementRef;
  isloading = false;
  isUploading = false;
  isLoader: boolean = false;
  urlBase = environment.apiUrl;
  isAssessementFinalized = false;

  constructor(
    private evaluatorService: EvaluatorService,
    private userService: UserService,
    private toaster: ToasterService,
    private fb: FormBuilder,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.isLoader = true;
    this.formInitialized();
    this.GetAllPillars();
<<<<<<< HEAD
    this.getCountryByUserIdForAssessment();
=======
    this.getCityByUserIdForAssessment();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
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
          source: [q.isSelected ? option?.source : ""]
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
      });
    }
  }

  GetAllPillars() {
    this.evaluatorService.getAllPillars().subscribe((pillars) => {
      this.pillars = pillars;
    });
  }
  pillarChanged(pillar?: PillarsVM) {
<<<<<<< HEAD
    if (!this.selectedUserCountryMappingID || this.selectedUserCountryMappingID == 0) {
      this.toaster.showWarning("Please select country first");
=======
    if (!this.selectedUserCityMappingID || this.selectedUserCityMappingID == 0) {
      this.toaster.showWarning("Please select city first");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      return;
    }

    this.isAssessementFinalized = false;
    if (pillar) {
      this.selectedPillar = pillar;
<<<<<<< HEAD
      this.getQuestionsByCountryId();
=======
      this.getQuestionsByCityId();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    } else {
      this.selectedPillar = this.pillars.find(
        (x) => x.pillarID == this.pillerQuestions?.pillarID
      );
      if (this.pillerQuestions && this.pillerQuestions?.submittedPillarDisplayOrder < (this.selectedPillar?.displayOrder ?? 0)) {
        this.pillarDisplayOrder = this.selectedPillar?.displayOrder ?? 1;
      }
    }
  }
<<<<<<< HEAD
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
            this.selectedUserCountryMappingID = this.evaluatorService.userCountryMappingIDSubject$.value != null ?
              this.evaluatorService.userCountryMappingIDSubject$.value
              : this.countries[0].userCountryMappingID ?? 0;

            setTimeout(() => {
              this.toaster.showInfo(
                "You have rediredected to assgined country, please submit all pillars for the country"
              );
            }, 1000);
            this.getQuestionsByCountryId();
=======
  cityChanged() {
    this.selectedPillar = undefined;
    this.getQuestionsByCityId();
  }
  getCityByUserIdForAssessment() {
    this.selectedPillar = undefined;
    this.commonService.getUserNearestCity()
      .subscribe({
        next: (res) => {
          this.cities = res.result ?? [];
          if (this.cities.length > 0) {
            this.selectedUserCityMappingID = this.evaluatorService.userCityMappingIDSubject$.value != null ?
              this.evaluatorService.userCityMappingIDSubject$.value
              : this.cities[0].userCityMappingID ?? 0;

            setTimeout(() => {
              this.toaster.showInfo(
                "You have rediredected to assgined city, please submit all pillars for the city"
              );
            }, 1000);
            this.getQuestionsByCityId();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          } else {
            this.toaster.showWarning(res.errors.join(", "));
          }
        },
        error: () => {
          this.toaster.showWarning("There is an error please try again");
        },
      });
  }

<<<<<<< HEAD
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
=======
  getQuestionsByCityId() {
    if (
      !this.selectedUserCityMappingID ||
      this.selectedUserCityMappingID == 0
    ) {
      this.toaster.showWarning("Please select city first");
      return;
    }
    this.formInitialized();
    const payload: CityMappingPillerRequestDto = {
      userCityMappingID: this.selectedUserCityMappingID ?? 0,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    };
    if (this.selectedPillar) {
      payload.pillarID = this.selectedPillar.pillarID;
    }
    this.pillerQuestions = null;
    this.isLoader = true;
<<<<<<< HEAD
    this.evaluatorService.getQuestionsByCountryId(payload).subscribe({
=======
    this.evaluatorService.getQuestionsByCityId(payload).subscribe({
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      next: (res) => {
        this.isLoader = false;
        if (res.succeeded) {
          this.pillerQuestions = res.result;
          this.pillarDisplayOrder =
            this.pillerQuestions?.submittedPillarDisplayOrder ?? 1;
          this.pillarChanged();
          if (this.pillerQuestions && this.pillerQuestions?.assessmentID > 0) {
            this.getAssessmentProgressHistory();
          } else {
            this.userService.assessmentProgress.next(null);
          }
          this.loadQuestions();
        } else {
<<<<<<< HEAD
          this.toaster.showWarning("Country's assessment is already submitted");
=======
          this.toaster.showWarning("City's assessment is already submitted");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        }
      },
    });
  }

  SaveAssessment() {
    if (
<<<<<<< HEAD
      !this.selectedUserCountryMappingID ||
      this.selectedUserCountryMappingID == 0
    ) {
      this.toaster.showWarning("Please select country first");
=======
      !this.selectedUserCityMappingID ||
      this.selectedUserCityMappingID == 0
    ) {
      this.toaster.showWarning("Please select city first");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      return;
    }
    const validQuestions = this.questionsArray.controls
      .filter((ctrl) => ctrl.valid)
      .map((ctrl) => ctrl.value as AddAssessmentResponseDto);
    const payload: AddAssessmentDto = {
<<<<<<< HEAD
      userCountryMappingID: this.selectedUserCountryMappingID,
=======
      userCityMappingID: this.selectedUserCityMappingID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
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
      this.evaluatorService.saveAssessment(payload).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.scrollContainer.nativeElement.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }, 300);
          if (res.succeeded) {
            if (this.pillerQuestions?.displayOrder == 14 || this.isAssessementFinalized) {
<<<<<<< HEAD
              this.evaluatorService.userCountryMappingIDSubject$.next(null);
              this.getCountryByUserIdForAssessment();
            } else {
              if (this.selectedPillar)
                this.selectedPillar = this.pillars.find(x => x.displayOrder == (Number(this.selectedPillar?.displayOrder) + 1));
              this.getQuestionsByCountryId();
=======
              this.evaluatorService.userCityMappingIDSubject$.next(null);
              this.getCityByUserIdForAssessment();
            } else {
              if (this.selectedPillar)
                this.selectedPillar = this.pillars.find(x => x.displayOrder == (Number(this.selectedPillar?.displayOrder) + 1));
              this.getQuestionsByCityId();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
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
<<<<<<< HEAD
    if (this.selectedUserCountryMappingID != 0) {
      this.isloading = true;
      this.evaluatorService
        .ExportQuestions(this.selectedUserCountryMappingID)
        .subscribe({
          next: (res: any) => {
            var country = this.countries?.find(
              (x) => x.userCountryMappingID == this.selectedUserCountryMappingID
=======
    if (this.selectedUserCityMappingID != 0) {
      this.isloading = true;
      this.evaluatorService
        .ExportQuestions(this.selectedUserCityMappingID)
        .subscribe({
          next: (res: any) => {
            var city = this.cities?.find(
              (x) => x.userCityMappingID == this.selectedUserCityMappingID
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
            );
            this.isloading = false;
            const url = window.URL.createObjectURL(res);
            const a = document.createElement("a");
            a.href = url;
            a.download =
<<<<<<< HEAD
              country?.countryName + "_" + country?.assignedBy + "_Questions.xlsx";
=======
              city?.cityName + "_" + city?.assignedBy + "_Questions.xlsx";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
            a.click();
            this.toaster.showSuccess("Questions downloaded successfully");
          },
          error: () => {
            this.isloading = false;
            this.toaster.showError("failed to download questions try again");
          },
        });
    } else {
<<<<<<< HEAD
      this.toaster.showWarning("Please select country to get questions");
=======
      this.toaster.showWarning("Please select city to get questions");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    }
  }

  handleFileUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userID", this.userService?.userInfo?.userID?.toString());
    this.isUploading = true;
    this.evaluatorService.ImportAssessment(formData).subscribe({
      next: (res) => {
        this.selectedPillar = undefined;
        this.isUploading = false;
        if (res.succeeded) {
<<<<<<< HEAD
          this.getCountryByUserIdForAssessment();
=======
          this.getCityByUserIdForAssessment();
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
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
    this.evaluatorService
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
<<<<<<< HEAD
      if (!this.selectedUserCountryMappingID || this.selectedUserCountryMappingID == 0) {
        this.toaster.showWarning("Please select country first");
=======
      if (!this.selectedUserCityMappingID || this.selectedUserCityMappingID == 0) {
        this.toaster.showWarning("Please select city first");
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        return;
      }
      if (this.questionsArray.controls[index].valid && this.questionsArray.controls[index].dirty) {

        const payload: AddAssessmentDto = {
<<<<<<< HEAD
          userCountryMappingID: this.selectedUserCountryMappingID,
=======
          userCityMappingID: this.selectedUserCityMappingID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          assessmentID: this.pillerQuestions?.assessmentID ?? 0,
          pillarID: this.pillerQuestions?.pillarID ?? 0,
          responses: [this.questionsArray.controls[index].value],
          isAutoSave: true,
          isFinalized: false
        };
        this.evaluatorService.saveAssessment(payload).subscribe({
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
}
