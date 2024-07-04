import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

import { ApiCountryService } from 'src/app/services/api-country.service';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.sass']
})
export class AboutFormComponent implements OnChanges {
  @Input() dateUser: any;
  @Output() loadingUser = new EventEmitter();
  countries!: any[];
  states!: any[];

  formAbout!: FormGroup;

  constructor( private formBuider: FormBuilder,
                private apiCountry: ApiCountryService,
                private userService: UserService) {
    this.createAbout();

    // this.viewCountries();
    // this.viewStates();
  }

  ngOnChanges(): void {
    this.getUser();
  }

  campoNoValido(campo: string) {
    return this.formAbout.get(campo)?.invalid && this.formAbout.get(campo)?.touched;
  }

  createAbout() {
    this.formAbout = this.formBuider.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(5)]],
      city: [''],
      country: ['']
    });
  }

  getUser() {
    if(this.dateUser){
      this.formAbout.reset({
        name: this.dateUser.name,
        last_name: this.dateUser.last_name,
        city: this.dateUser.city,
        country: this.dateUser.country 
      })
    } 
  }

  guardar() {
    console.log(this.formAbout);
    const formUser: userModel = this.formAbout.value; 
    const idUser = this.dateUser.id;
    if( this.formAbout.invalid) {
      return this.formAbout.markAllAsTouched();
    }
    this.userService.updateUser(idUser, formUser).subscribe((res: any) => {
      console.log(res);
      this.loadingUser.emit();
    })
  }

  /* Obtener datos de ubicacion */
  // viewCountries() {
  //   this.apiCountry.getCountries().subscribe((countries : any) => {
  //     this.countries = countries;
  //     console.log(countries);
  //     // console.log(countries.iso2);
  //   })
  // }

  // viewStates(code: string) {
  //   this.apiCountry.getStates(code).subscribe((states: any) => {
  //     this.states = states;
  //     console.log(states);
  //   })
  // }

  /*********************************************************************** */
// selectedCountry: any;
// config = {
//   displayFn:(item: any) =>  `${item.name} - (${item.iso2})`, //a replacement ofr displayKey to support flexible text displaying for each item
//   displayKey:"description", //if objects array passed which key to be displayed defaults to description
//   search:true, //true/false for the search functionlity defaults to false,
//   height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
//   placeholder:'Select', // text to be displayed when no item is selected defaults to Select,
//   customComparator: (a: any, b: any) => {
//     if (a.name > b.name) return 1;
//     if (a.name < b.name) return -1;
//     return 0;
//   }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
//   limitTo: 6,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
//   moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
//   noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
//   searchPlaceholder:'Search', // label thats displayed in search input,
//   searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
//   }

// onChange(event: any) {
//   this.selectedCountry = event;
//   console.log(event.value.native);
//   this.viewStates(event.value.iso2);
// }

}
