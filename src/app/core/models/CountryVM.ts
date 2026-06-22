export interface CountryVM extends AddUpdateCountryDto {
  isActive: boolean;
  createdDate: string;   // ISO date string from backend
  updatedDate?: string | null;
  isDeleted: boolean;
  assignedBy?: string;
  image?: string;
  userCountryMappingID?:number;
  score?: number;
  progress?: number;
  aiScore?: number;
  selected:boolean;
}
export interface AddUpdateCountryDto {
  countryID: number;
  countryName: string;
  countryAliasName?: string;
  countryCode: string;
  region: string;
  continent: string;
  imageFile: string;
  imageUrl: string;
  longitude: number;
  latitude: number;
  population: number;
  income: number;
  livingCost: number;
  purchasingPower: number;
  peerCountriesIDs: number;
}

export interface BulkAddCountryDto {
  countries : CountryVM[]
}