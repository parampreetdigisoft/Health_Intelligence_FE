import { UserRoleValue } from "src/app/core/enums/UserRole";
import { PaginationRequest } from "src/app/core/models/PaginationRequest";
import { PublicUserResponse } from "src/app/core/models/UserInfo";
<<<<<<< HEAD
import {  AddUpdateCountryDto } from "./CountryVM";

export interface GetUserByRoleResponse  extends PublicUserResponse {
  countries: AddUpdateCountryDto[];
=======
import { AddUpdateCityDto } from "./CityVM";

export interface GetUserByRoleResponse  extends PublicUserResponse {
  cities: AddUpdateCityDto[];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}


export interface GetUserByRoleRequestDto extends PaginationRequest{
  userID: number;
  getUserRole?:UserRoleValue;
}