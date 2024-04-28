import { Component, ElementRef, OnInit, PLATFORM_ID,Inject, Output, EventEmitter} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Loader } from '@googlemaps/js-api-loader';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { SourceTextModule } from 'vm';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './location-picker.component.html',
  styleUrl: './location-picker.component.scss',
})
export class LocationPickerComponent implements OnInit { 
  @Output() isPicked = new EventEmitter<boolean>();

  current_marker: google.maps.Marker | undefined;
  marker: google.maps.Marker | undefined;
  map: google.maps.Map | undefined ;
  picked_location : any | undefined

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    console.log('load map ....' + this.platformId);
    if (isPlatformBrowser(this.platformId)) {
      let loader = new Loader({
        apiKey: 'AIzaSyBkGwKVdxpDu9-aW-hbxvn6HxZX4N6CgcY',
        libraries: ["places"], // Ensure the places library is loaded
      });

      loader.load().then(async () => {
        // Get the user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              let userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              let map_element = this.elementRef.nativeElement.querySelector('#map');

              if (map_element) {
                this.map = new google.maps.Map(map_element, {
                  center: userLocation,
                  zoom: 16,
                  mapTypeId: 'roadmap',
                  disableDefaultUI: false,
                  draggable: true,
                  scrollwheel: true,
                  fullscreenControl: true,
                  styles: [
                    /* Specify custom map styles */
                  ],
                  gestureHandling: 'auto',
                  minZoom: 0,
                  maxZoom: 21,
                });

                // Create a marker for the current location
                this.current_marker = new google.maps.Marker({
                  position: userLocation,
                  map: this.map,
                  title: 'Your Location',
                  icon: {
                    url: '../../assets/images/current_location.png', // Path to your icon image
                    // Optional: specify size, origin, or anchor if necessary
                    scaledSize: new google.maps.Size(30, 30), // Scales the icon size
                  }
                });

                // Listen for click events on the map
                this.map.addListener('click', (mapsMouseEvent:google.maps.MapMouseEvent) => {
                  // Close the current InfoWindow.
                  this.picked_location = mapsMouseEvent.latLng!.toJSON(); // Get the latitude and longitude of the clicked location

                  // Place a marker at the clicked location
                  if (this.marker) {
                    this.marker.setMap(null); // Remove the previous marker, if any
                  }
                  this.marker = new google.maps.Marker({
                    position: this.picked_location,
                    map: this.map,
                  });

                  console.log(`Clicked location: Lat: ${this.picked_location!.lat}, Lng: ${this.picked_location!.lng}`);
                  // You can now use clickedLocation.lat and clickedLocation.lng as needed
                  this.isPicked.emit(true);
                });    
  
              } else {
                console.error('Element not found');
              }
            },
            (error) => {
              console.error('Error getting user location:', error);
            }
          );
        } else {
          console.error('Geolocation is not supported by this browser.');
        }
      });
    } else {
      // console.error('isPlatformBrowser(this.platformId) is false, ' + this.platformId);
    }
  }

  refreshMap(): void {
    if (this.map && this.picked_location) {
      // Triggering resize event
      google.maps.event.trigger(this.map, 'resize');
      // Re-center the map
      this.map.setCenter(this.picked_location);
    }
  }


  resetMap(): void {
    if (this.map) {
      // Clear the marker if it exists
      if (this.marker) {
        this.marker.setMap(null);
        this.marker = undefined; // Optional: Clear the marker reference
      }

      this.picked_location = null ;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            
            // Center the map on the user's initial location
            this.map!.setCenter(userLocation);

            // Optionally reset the zoom level
            this.map!.setZoom(15);
          }
        );
      } 
      else {
        console.error('Map or initial location not defined.');
      }
    }
  }
}
