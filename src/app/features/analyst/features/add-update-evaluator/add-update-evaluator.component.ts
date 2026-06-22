import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { CountryVM } from '../../../../core/models/CountryVM';
=======
import { CityVM } from '../../../../core/models/CityVM';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetUserByRoleResponse } from '../../../../core/models/GetUserByRoleResponse';
import { InviteUserDto, UpdateInviteUserDto } from 'src/app/core/models/AnalystVM';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { UserRoleValue } from 'src/app/core/enums/UserRole';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-update-evaluator',
  templateUrl: './add-update-evaluator.component.html',
  styleUrl: './add-update-evaluator.component.css'
})
export class AddUpdateEvaluatorComponent {
  @Input() evaluator: GetUserByRoleResponse | null = null;
<<<<<<< HEAD
  @Input() countries: CountryVM[] | null = [];
=======
  @Input() cities: CityVM[] | null = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  @Output() evaluatorChange = new EventEmitter<UpdateInviteUserDto | null>();
  @Output() bulkImportChange = new EventEmitter<UpdateInviteUserDto[] | null>();
  @Output() closeModal = new EventEmitter<boolean>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() loading: boolean = false;
  alertMsg ='';
  excelData: any;
  isSubmitted: boolean = false;
  requiredHeaders = [
    "FullName",
    "Email",
    "Phone",
<<<<<<< HEAD
    "CountryName"
=======
    "CityName"
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  ];
  evaluatorForm: FormGroup<any> = this.fb.group({});

  constructor(private fb: FormBuilder, private userService: UserService) {
    // Initialization logic can go here
  }
  ngOnInit(): void {
    this.initializeForm(this.evaluator)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isSubmitted = false;
    //this.initializeForm(this.evaluator)
  }



  initializeForm(evaluator: GetUserByRoleResponse | null) {
    this.evaluatorForm = this.fb.group({
      fullName: [evaluator?.fullName, [Validators.required]],
      email: [evaluator?.email, [Validators.required, Validators.email]],
      phone: [evaluator?.phone, [Validators.required]],
<<<<<<< HEAD
      country: [evaluator?.countries?.map(x => x?.countryID) ?? [], [Validators.required]]
=======
      city: [evaluator?.cities?.map(x => x?.cityID) ?? [], [Validators.required]]
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    });
    this.evaluatorForm.updateValueAndValidity();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.evaluatorForm.valid) {
<<<<<<< HEAD
      const countryData: UpdateInviteUserDto = {
        ...this.evaluatorForm.value,
        userID: this.evaluator?.userID ?? 0,
        countryID: this.evaluatorForm.value.country
      };
      this.evaluatorChange.emit(countryData);
=======
      const cityData: UpdateInviteUserDto = {
        ...this.evaluatorForm.value,
        userID: this.evaluator?.userID ?? 0,
        cityID: this.evaluatorForm.value.city
      };
      this.evaluatorChange.emit(cityData);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    }

  }
  downloadTemplate() {
    const headers = [
      "FullName",
      "Email",
      "Phone",
<<<<<<< HEAD
      "CountryName"
=======
      "CityName"
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    ];

    // One sample row
    const sampleRow = {
      FullName: "FullName of Evaluator",
      Email: "Enter Email of Evaluator",
      Phone: "Enter Phone Number of Evaluator",
<<<<<<< HEAD
      CountryName: "Enter country separated by comma, like :- India, USA, Canada"
=======
      CityName: "Enter city seprated by comma, like :- Chandigarh, Mohali, Swar"
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
    };

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([sampleRow], { header: headers });
    ws['!cols'] = headers.map(() => ({ wch: 20 }));
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'EvaluatorTemplate');

    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'EvaluatorTemplate.xlsx');
  }
  onFileChange(evt: any) {
    this.alertMsg ='';
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) return;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const jsonData = <any[]>XLSX.utils.sheet_to_json(ws, { defval: "" });

      // ✅ Header validation
      const headers = Object.keys(jsonData[0] || {});
      const missingHeaders = this.requiredHeaders.filter(h => !headers.includes(h));
      if (missingHeaders.length > 0) {
        this.alertMsg =`Invalid file format. Missing headers: ${missingHeaders.join(", ")}`;
        this.fileInput.nativeElement.value = "";
        return;
      }

      // ✅ Validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9+\-\s()]+$/;

      const excelData: InviteUserDto[] = [];

      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];

        const fullName = String(row["FullName"] || "").trim();
        const email = String(row["Email"] || "").trim();
        const phone = String(row["Phone"] || "").trim();
<<<<<<< HEAD
        const countryName = String(row["CountryName"] || "").trim();

        const isCompletelyBlank = !fullName && !email && !phone && !countryName;
=======
        const cityName = String(row["CityName"] || "").trim();

        const isCompletelyBlank = !fullName && !email && !phone && !cityName;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        if (isCompletelyBlank) {
          continue;
        }
        // ✅ Required check
<<<<<<< HEAD
        if (!fullName || !email || !phone || !countryName) {
=======
        if (!fullName || !email || !phone || !cityName) {
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
          this.alertMsg = `Row ${i + 2}: All fields are required.`;
          this.fileInput.nativeElement.value = "";
          return;
        }

        // ✅ Email validation
        if (!emailRegex.test(email)) {
          this.alertMsg =`Row ${i + 2}: Invalid email format (${email}).`;
          this.fileInput.nativeElement.value = "";
          return;
        }
        if (excelData.some(c => c.email.toLowerCase() === email.toLowerCase())) {
          this.alertMsg = `Row ${i + 2}: Duplicate email name (${email}).`;
          this.fileInput.nativeElement.value = "";
          return;
        }

        // ✅ Phone validation
        if (!phoneRegex.test(phone)) {
          this.alertMsg =`Row ${i + 2}: Invalid phone number format (${phone}).`;
          this.fileInput.nativeElement.value = "";
          return;
        }

        // ✅ Construct DTO (invitedUserID/userID can be handled later by API)
        const dto: InviteUserDto = {
          invitedUserID: this.userService.userInfo?.userID ?? 0,
          fullName,
          email,
          phone,
          password: email,
          role: UserRoleValue.Evaluator,
<<<<<<< HEAD
          countryID: this.getCountryByName(countryName)
=======
          cityID: this.getCityByName(cityName)
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        };
        excelData.push(dto);
      }
      this.excelData = excelData;
    };
    reader.readAsBinaryString(target.files[0]);
  }

<<<<<<< HEAD
  getCountryByName(countryNames: string): number[] {
    if (!countryNames) return [];
    return countryNames
      .split(",")
      .map(name => name.trim())
      .map(name => this.countries?.find(c => c.countryName === name)?.countryID)
=======
  getCityByName(cityNames: string): number[] {
    if (!cityNames) return [];
    return cityNames
      .split(",")
      .map(name => name.trim())
      .map(name => this.cities?.find(c => c.cityName === name)?.cityID)
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      .filter((id): id is number => id !== undefined);
  }

  bulkImport() {
    if (this.excelData.length > 0 && this.fileInput.nativeElement.value !="") {
      this.bulkImportChange.emit(this.excelData);
      this.fileInput.nativeElement.value = "";
      this.excelData=[];
    }
  }
  closeModel() {
    if( this.fileInput?.nativeElement?.value)
    this.fileInput.nativeElement.value = "";
    this.alertMsg =''
    this.closeModal.emit(true);
  }
}
