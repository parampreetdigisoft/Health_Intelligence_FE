import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
<<<<<<< HEAD
import { CountryVM } from 'src/app/core/models/CountryVM';
=======
import { CityVM } from 'src/app/core/models/CityVM';
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1
import { UserService } from 'src/app/core/services/user.service';

@Injectable({
  providedIn: 'root'
})

export class UserDataShareService {

<<<<<<< HEAD
  public country = signal<CountryVM | null>(null);

  public compareCountry = signal<CountryVM[] | null>(null);

  userService = inject(UserService);

  public userCountryMappingIDSubject$ = new BehaviorSubject<number | null>(null);
=======
  public city = signal<CityVM | null>(null);

  public compareCity = signal<CityVM[] | null>(null);

  userService = inject(UserService);

  public userCityMappingIDSubject$ = new BehaviorSubject<number | null>(null);
>>>>>>> 9bde2debd31e1f04446351354c9d704a5439b7b1



}
