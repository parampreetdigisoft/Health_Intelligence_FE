import {  TieredAccessPlanValue } from "src/app/core/enums/TieredAccessPlan";

export interface UserCountryGetPillarInfoRequstDto {
    userID?: number;
    countryID: number;
    pillarID: number;
    updatedAt?: string;
    Tiered?:TieredAccessPlanValue
}