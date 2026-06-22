<<<<<<< HEAD

import { CountryVM } from "./CountryVM";
=======
import { CityVM } from "./CityVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { PaginationUserRequest } from "./PaginationRequest";

export interface GetAnalyticalLayerRequestDto extends PaginationUserRequest {
  layerID?: number ;
<<<<<<< HEAD
  countryID?:number;
=======
  cityID?:number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  year?:number;
}

export interface GetAnalyticalLayerResultDto extends AnalyticalLayerResponseDto {
  layerResultID: number;
<<<<<<< HEAD
  countryID: number;
=======
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
  interpretationID?: number | null;
  normalizeValue?: number | null;
  calValue1?: number ;
  calValue2?: number ;
  calValue3?: number ;
  calValue4?: number ;
  calValue5?: number ;
  lastUpdated: string; 

  aiInterpretationID?: number | null;
  aiNormalizeValue?: number | null;
  aiCalValue1?: number ;
  aiCalValue2?: number ;
  aiCalValue3?: number ;
  aiCalValue4?: number ;
  aiCalValue5?: number ;
  aiLastUpdated?: string; 

  fiveLevelInterpretations: FiveLevelInterpretation[];
<<<<<<< HEAD
  country?: CountryVM | null;
=======
  city?: CityVM | null;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}

export interface AnalyticalLayerResponseDto {
  layerID: number;
  layerCode: string;
  layerName: string;
  purpose: string;
  calText1: string;
  calText2: string;
  calText3: string;
  calText4: string;
  calText5: string;
}

export interface FiveLevelInterpretation {
  interpretationID: number;
  layerID: number;
  minRange: number;
  maxRange: number;
  condition: string;
  descriptor: string;
  urbanSignal: string;
  strategicAction: string;
}
