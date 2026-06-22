<<<<<<< HEAD

import { CountryVM } from "../CountryVM";
=======
import { CityVM } from "../CityVM";
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { FiveLevelInterpretation } from "../GetAnalyticalLayerResultDto";

export interface GetMutiplekpiLayerResultsDto {
  layerID: number;
  layerCode: string;
  layerName: string;
  purpose: string;

  calText1?: string | null;
  calText2?: string | null;
  calText3?: string | null;
  calText4?: string | null;
  calText5?: string | null;

<<<<<<< HEAD
  countries: MutipleCountrieskpiLayerResults[];
=======
  cities: MutipleCitieskpiLayerResults[];
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

  fiveLevelInterpretations: FiveLevelInterpretation[];
}

<<<<<<< HEAD
export interface MutipleCountrieskpiLayerResults {
  layerResultID: number;
  countryID: number;
=======
export interface MutipleCitieskpiLayerResults {
  layerResultID: number;
  cityID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1

  interpretationID?: number | null;
  normalizeValue?: number | null;

  calValue1?: number | null;
  calValue2?: number | null;
  calValue3?: number | null;
  calValue4?: number | null;
  calValue5?: number | null;

  lastUpdated: string; // ISO date string

  aiInterpretationID?: number | null;
  aiNormalizeValue?: number | null;

  aiCalValue1?: number | null;
  aiCalValue2?: number | null;
  aiCalValue3?: number | null;
  aiCalValue4?: number | null;
  aiCalValue5?: number | null;

  aiLastUpdated?: string | null;

<<<<<<< HEAD
  country?: CountryVM;
=======
  city?: CityVM;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}
