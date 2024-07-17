import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ubicationModel } from 'src/app/models/ubication.model';

import { ApiCountryService } from 'src/app/services/api-country.service';

@Component({
  selector: 'app-ubication-form',
  templateUrl: './ubication-form.component.html',
  styleUrls: ['./ubication-form.component.sass']
})
export class UbicationFormComponent {
  countries!: any[];
  states!: any[];
  cities!: any[];

  isoCountrie: string;
  isoState: string;

  formUbication!: FormGroup;

  constructor(  private formBuilder: FormBuilder,
                private apiCountry: ApiCountryService) {
    this.isoCountrie = '';
    this.isoState = '';
    this.viewCountries();

    this.createUbication();
  }

  createUbication() {
    this.formUbication = this.formBuilder.group({
      country: ['', [Validators.required]],
      state: [''],
      city: ['']
    });
  }

  viewCountries() {
    this.apiCountry.getCountries().subscribe((countries : any) => {
      this.countries = countries;
      // console.log(countries);
    });
  }

  viewStates(code: string) {
    this.apiCountry.getStates(code).subscribe((states: any) => {
      this.states = states;
      // console.log(states);
    });
  }

  viewCities(countrie: string, state:string) {
    this.apiCountry.getCities(countrie, state).subscribe((cities: any) => {
      this.cities = cities;
      // console.log(this.cities);
    });
  }

  selectedCountry: any;
  configCountrie = {
    displayFn:(item: any) =>  `${item.name} - (${item.iso2})`, //a replacement ofr displayKey to support flexible text displaying for each item
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: '300px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona un pais', // text to be displayed when no item is selected defaults to Select,
    customComparator: (a: any, b: any) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 250,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  onCountrieChange(event: any) {
    this.selectedCountry = event;
    // console.log(event.value.native);
    this.isoCountrie = event.value.iso2;
    this.viewStates(this.isoCountrie);
  }

  selectedState: any;
  configState = {
    displayFn:(item: any) =>  `${item.name}`, //a replacement ofr displayKey to support flexible text displaying for each item
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona un estado', // text to be displayed when no item is selected defaults to Select,
    customComparator: (a: any, b: any) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 6,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  onStateChange(event: any) {
    this.selectedState = event;
    // console.log(event.value.iso2);
    this.isoState = event.value.iso2;
    this.viewCities(this.isoCountrie, this.isoState);
  }

  selectedCity: any;
  configCity = {
    displayFn:(item: any) =>  `${item.name}`, //a replacement ofr displayKey to support flexible text displaying for each item
    displayKey:"description", //if objects array passed which key to be displayed defaults to description
    search:true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder:'Selecciona tu ciudad', // text to be displayed when no item is selected defaults to Select,
    customComparator: (a: any, b: any) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 6,// number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
    searchPlaceholder:'Search', // label thats displayed in search input,
    searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  }

  onCityChange(event: any) {
    this.selectedState = event;
    // console.log(event.value.iso2);
  }

  viewResult() {
    return this.formUbication.value;
    // console.log(this.formUbication);
  }

}
