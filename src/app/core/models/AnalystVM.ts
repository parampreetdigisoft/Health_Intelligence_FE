
export interface RegisterDto {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: number;
}

export interface InviteUserDto extends RegisterDto {
  invitedUserID: number;
<<<<<<< HEAD
  countryID: number[]; 
=======
  cityID: number[]; 
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}

export interface UpdateInviteUserDto extends InviteUserDto {
  userID: number;
}
export interface InviteBulkUserDto {
  users: InviteUserDto[];
}
<<<<<<< HEAD
export interface SendRequestMailToUpdateCountry {
    userID: number;
    mailToUserID: number;
    userCountryMappingID: number;
=======
export interface SendRequestMailToUpdateCity {
    userID: number;
    mailToUserID: number;
    userCityMappingID: number;
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
}
