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
      'tourist_attraction', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/tourist_attraction.svg') // Path to the SVG icon
    );
  }

  placeIconMap: PlaceIconMapping = {
    tourist_attraction: 'camera_alt',
    airport: 'local_airport',
    amusement_park: ['local_play', 'ferris_wheel'],
    aquarium: 'water',
    art_gallery: ['brush', 'palette'],
    atm: 'atm',
    bakery: ['cake', 'local_cafe'],
    bank: ['account_balance', 'savings'],
    bar: ['local_bar', 'cocktail'],
    beauty_salon: ['content_cut', 'spa'],
    bicycle_store: 'directions_bike',
    store: 'store',
    grocery_or_supermarket: 'local_grocery_store',
    book_store: ['book', 'library_books'],
    bowling_alley: 'sports_bowling',
    bus_station: 'directions_bus',
    cafe: 'local_cafe',
    school: 'school',
    restaurant: 'restaurant',
    campground: ['fireplace', 'terrain'],
    car_dealer: ['car_repair', 'directions_car'],
    car_rental: 'car_rental',
    car_repair: ['build', 'car_repair'],
    car_wash: 'local_car_wash',
    casino: 'casino',
    cemetery: 'content_cut',
    church: ['church', 'a cross icon'],
    city_hall: 'account_balance',
    clothing_store: ['checkroom', 'shopping_bag'],
    convenience_store: 'local_convenience_store',
    courthouse: ['gavel', 'account_balance'],
    dentist: 'medical_services',
    department_store: 'local_mall',
    doctor: ['local_hospital', 'medical_services'],
    drugstore: ['local_pharmacy', 'healing'],
    electrician: 'electrical_services',
    electronics_store: ['smartphone', 'devices_other'],
    embassy: ['flag', 'public'],
    fire_station: 'fire_truck',
    florist: 'local_florist',
    funeral_home: 'church',
    furniture_store: 'weekend',
    gas_station: 'local_gas_station',
    gym: 'fitness_center',
    hair_care: 'content_cut',
    hardware_store: 'hardware',
    hindu_temple: 'temple_hindu',
    home_goods_store: ['home', 'shopping_bag'],
    hospital: 'local_hospital',
    insurance_agency: ['shield', 'security'],
    jewelry_store: 'local_mall',
    laundry: 'local_laundry_service',
    lawyer: ['gavel', 'balance'],
    library: 'library_books',
    light_rail_station: 'tram',
    liquor_store: ['liquor', 'local_bar'],
    local_government_office: ['account_balance', 'government'],
    locksmith: ['lock_open', 'lock'],
    lodging: 'hotel',
    meal_delivery: 'delivery_dining',
    meal_takeaway: 'takeout_dining',
    mosque: 'mosque',
    movie_rental: ['movie', 'theaters'],
    movie_theater: ['local_movies', 'movie'],
    moving_company: ['local_shipping', 'move_to_inbox'],
    museum: 'museum',
    night_club: ['music_note', 'nightlife'],
    painter: 'format_paint',
    park: 'park',
    parking: 'local_parking',
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
      return 'error_outline';
    }
  }
}
