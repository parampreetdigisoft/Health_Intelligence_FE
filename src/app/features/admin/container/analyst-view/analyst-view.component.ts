import { Component, OnDestroy, OnInit } from "@angular/core";
import { AdminService } from "../../admin.service";
<<<<<<< HEAD
import { CountryVM } from "../../../../core/models/CountryVM";
=======
import { CityVM } from "../../../../core/models/CityVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { PaginationResponse } from "src/app/core/models/PaginationResponse";
import { ToasterService } from "src/app/core/services/toaster.service";
import { UserService } from "src/app/core/services/user.service";
import {
  GetUserByRoleRequestDto,
  GetUserByRoleResponse,
} from "../../../../core/models/GetUserByRoleResponse";
import { UserRoleValue } from "src/app/core/enums/UserRole";
import {
  InviteBulkUserDto,
  UpdateInviteUserDto,
} from "../../../../core/models/AnalystVM";
import { SortDirection } from "src/app/core/enums/SortDirection";
import { ActivatedRoute } from "@angular/router";
declare var bootstrap: any;
@Component({
  selector: "app-analyst-view",
  templateUrl: "./analyst-view.component.html",
  styleUrl: "./analyst-view.component.css",
})
export class AnalystViewComponent implements OnInit, OnDestroy {
  isLoader: boolean = false;
  selectedAnalyst: GetUserByRoleResponse | null = null;
<<<<<<< HEAD
  selectedCountry: CountryVM | null = null;
=======
  selectedCity: CityVM | null = null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  analystResponse: PaginationResponse<GetUserByRoleResponse> | undefined;
  totalRecords: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
<<<<<<< HEAD
  countries: CountryVM[] | null = [];
=======
  cities: CityVM[] | null = [];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  loading: boolean = false;
  isOpendialog: boolean = false;
  roleId: number | any = 0;
  selectedRoleID: UserRoleValue | any = "";
  selectedIndex?:number;
  rolesList = [
    { name: "Evaluator", role: UserRoleValue.Evaluator },
<<<<<<< HEAD
    { name: "CityUser", role: UserRoleValue.CountryUser },
=======
    { name: "CityUser", role: UserRoleValue.CityUser },
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  ];

  constructor(
    private adminService: AdminService,
    private toaster: ToasterService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.roleId = params.get("roleID");
      this.selectedRoleID = this.roleId;
    });
    this.getAnalyst();
<<<<<<< HEAD
    this.getAllCountriesByUserId();
  }

  getAllCountriesByUserId() {
    this.adminService
      .getAllCountriesByUserId(this.userService?.userInfo?.userID)
      .subscribe({
        next: (res) => {
          this.countries = res.result;
=======
    this.getAllCitiesByUserId();
  }

  getAllCitiesByUserId() {
    this.adminService
      .getAllCitiesByUserId(this.userService?.userInfo?.userID)
      .subscribe({
        next: (res) => {
          this.cities = res.result;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
        },
      });
  }
  getAnalyst(currentPage: number = 1) {
    this.analystResponse = undefined;
    this.isLoader = true;
    let payload: GetUserByRoleRequestDto = {
      sortDirection: SortDirection.DESC,
      sortBy: "userID",
      pageNumber: currentPage,
      pageSize: this.pageSize,
      userID: this.userService?.userInfo?.userID,
    };
    if (!this.roleId) {
      payload.getUserRole = UserRoleValue.Analyst;
    }
    this.adminService.getAnalyst(payload).subscribe((anaylist) => {
      this.analystResponse = anaylist;
      this.totalRecords = anaylist.totalRecords;
      this.currentPage = currentPage;
      this.pageSize = anaylist.pageSize;
      this.isLoader = false;
    });
  }

  editAnalyst(analyst: GetUserByRoleResponse | null, isOpen: boolean = true) {
    this.selectedAnalyst = analyst;
    if (isOpen) {
      this.opendialog();
    }
  }
  deleteAnalyst() {
    if (this.selectedAnalyst === null) {
      this.toaster.showError("No analyst selected for deletion");
      return;
    }
    this.adminService.deleteUser(this.selectedAnalyst.userID).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.getAnalyst(this.currentPage);
          this.toaster.showSuccess(res?.messages.join(", "));
        } else {
          this.toaster.showError(res?.errors.join(", "));
        }
      },
      error: () => {
        this.toaster.showError("Failed to delete analyst");
      },
    });
  }

  ResendInvitaion(analyst: GetUserByRoleResponse, i :number) {
    this.selectedIndex =i;
    let payload: UpdateInviteUserDto = {
      fullName: analyst.fullName,
      email: analyst.email,
      phone: analyst.phone ?? "",
      password: "",
      role: UserRoleValue.Analyst,
      invitedUserID: this.userService.userInfo?.userID ?? 0,
<<<<<<< HEAD
      countryID: analyst.countries.map((x) => x.countryID),
=======
      cityID: analyst.cities.map((x) => x.cityID),
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      userID: analyst.userID,
    };
    this.addUpdateAnalyst(payload);
  }

  addUpdateAnalyst(analyst: UpdateInviteUserDto | null) {
    if (!analyst) {
      return;
    }
    this.loading = true;
    let payload: UpdateInviteUserDto = {
      fullName: analyst.fullName,
      email: analyst.email,
      phone: analyst.phone,
      password: analyst.password,
      role: UserRoleValue.Analyst,
      invitedUserID: this.userService.userInfo?.userID ?? 0,
<<<<<<< HEAD
      countryID: analyst.countryID,
=======
      cityID: analyst.cityID,
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
      userID: analyst.userID,
    };

    if (analyst.userID > 0) {
      this.adminService.editAnalyst(payload).subscribe({
        next: (res) => {
          this.closeModal();
          if (res.succeeded) {
            this.getAnalyst(this.currentPage);
            this.toaster.showSuccess(res?.messages.join(", "));
          } else {
            this.toaster.showError(res?.errors.join(", "));
          }
        },
        error: () => {
          this.closeModal();
          this.toaster.showError("Failed to edit analyst");
        },
      });
    } else {
      this.adminService.addAnalyst(payload).subscribe({
        next: (res) => {
          this.closeModal();
          if (res.succeeded) {
            this.getAnalyst();
            this.toaster.showSuccess(res?.messages.join(", "));
          } else {
            this.toaster.showError(res?.errors.join(", "));
          }
        },
        error: () => {
          this.closeModal();
          this.toaster.showError("Failed to add analyst");
        },
      });
    }
  }

  opendialog() {
    this.isOpendialog = true;
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
     this.selectedIndex =undefined;
    this.loading = false;
    const homeTab = document.querySelector("#pills-home-tab") as HTMLElement;
    if (homeTab) {
      homeTab.click();
    }
    const modalEl = document.getElementById("exampleModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    this.isOpendialog = false;
  }
  ngOnDestroy(): void {}

  addBulkAnalyst(analysts: UpdateInviteUserDto[] | null) {
    if (!analysts) return;
    let payload: InviteBulkUserDto = {
      users: analysts,
    };
    this.loading = true;
    this.adminService.addBulkAnalyst(payload).subscribe({
      next: (res) => {
        this.closeModal();
        if (res.succeeded) {
          this.getAnalyst();
          this.toaster.showSuccess(res?.messages.join(", "));
        } else {
          this.toaster.showError(res?.errors.join(", "));
        }
      },
      error: () => {
        this.closeModal();
        this.toaster.showError("Failed to add analyst");
      },
    });
  }
}
