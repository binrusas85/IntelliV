import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

export interface PlaceIconMapping {
  [key: string]: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'pharmacy', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/pharmacy.svg') // Path to the SVG icon
    );
  }

  placeIconMap: PlaceIconMapping = {
    airport: 'local_airport',
    atm: 'atm',
    restaurant : 'restaurant',
    bakery: ['cake', 'local_cafe'],
    bank: ['account_balance', 'savings'],
    supermarket: 'local_grocery_store',
    bus_station: 'directions_bus',
    cafe: 'local_cafe',
    school: 'school',
    gym: 'fitness_center',
    hospital: 'local_hospital',
    laundry: 'local_laundry_service',
    lodging: 'hotel',
    mosque: 'mosque',
    park: 'park',
    shopping_mall: 'local_grocery_store'
  };

  // Function to get an icon by place type key, returning only the first element if it's an array
  getIconByKey(key: string): string | undefined {
    let value = this.placeIconMap[key];
    if (value) {
      if (Array.isArray(value)) {
        return value[0]; // Return the first element if it's an array
      }
      return value; // Return the value directly if it's not an array
    } else {
      return 'custom';
    }
  }
}
