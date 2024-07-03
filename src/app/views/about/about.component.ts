import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { profileModel } from 'src/app/models/profile.model';

import { UbicationService } from 'src/app/services/ubication.service';
import { ubicationModel } from 'src/app/models/ubication.model';

import { ApiCountryService } from 'src/app/services/api-country.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  countries!: any[];
  user!: userModel;
  profile!: profileModel;
  ubication!: ubicationModel;
  validatorProfile: boolean;
  idProfile: number;
  constructor(  private userService: UserService,
                private profileService: ProfileService,
                private apiCountry: ApiCountryService,
                private ubicationService: UbicationService,
                private route: ActivatedRoute,
                private router: Router) {
    this.validatorProfile = false;
    this.idProfile = 0;

    this.route.params.subscribe( params => {
      this.idProfile = params['id'];
      this.viewProfile(this.idProfile);
    });
  }

  ngOnInit(): void {
    this.viewUser();
    this.viewCountries();

    // this.viewUbication();
  }

  returnHome() {
    this.router.navigate(['home']);
  }

  nextExperience(id: number) {
    this.router.navigate(['experiencia', id]);
  }

  viewUser(){
    this.userService.getUser().subscribe( (user: userModel) => {
      this.user = user;
    });
  }

  viewProfile(id: number){
    console.log('VIEWPROFILE ES:', id);

    this.profileService.getProfile(id).subscribe((profile: profileModel) => {
      if(profile){
        this.profile = profile;
        this.idProfile = profile.id;
        
        this.validatorProfile = true;
      } else {
        console.log('FALSE: ',profile);
        this.validatorProfile = false;
      }
    });
  }

  /******************Cargar Ubicacion ************/
  // viewUbication() {
  //   this.ubicationService.getUbication().subscribe((ubication: ubicationModel) => {
  //     this.ubication = ubication;
  //     console.log(this.ubication);
  //   })
  // }

  /* Obtener datos de ubicacion */
  viewCountries() {
    this.apiCountry.getCountries().subscribe((countries : any) => {
      this.countries = countries;
      console.log(countries);
      // console.log(countries.iso2);
    })
  }

  /*********************************************************************** */
selectedCountry: any;
config = {
  displayFn:(item: any) =>  `${item.name} - (${item.iso2})`, //a replacement ofr displayKey to support flexible text displaying for each item
  displayKey:"description", //if objects array passed which key to be displayed defaults to description
  search:true, //true/false for the search functionlity defaults to false,
  height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
  placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
  customComparator: (a: any, b: any) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
  limitTo: 5,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
  moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
  noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
  searchPlaceholder:'Search', // label thats displayed in search input,
  searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

selectionChanged(event: any) {
  console.log(event);
}

}
