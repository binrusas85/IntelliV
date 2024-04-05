import { Neighbours } from '../utils/neighbours';
import { Component, ViewChild } from '@angular/core';
import { LocationPickerComponent } from '../location-picker/location-picker.component';
import { PropertyTypeComponent } from '../property-type/property-type.component';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { NeighbourhoodService } from '../neighbourhood.service';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import { KeyValuePipe } from '../key-value.pipe'; 
import {MatIconModule} from '@angular/material/icon';
import { IconService } from '../icon.service';
import { FormatPlacePipe } from '../format-place.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LocationPickerComponent, PropertyTypeComponent, PropertyDetailsComponent, 
    MatStepperModule, MatButtonModule, CommonModule, KeyValuePipe, MatDividerModule, 
  MatIconModule, FormatPlacePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(LocationPickerComponent) locationPicker!: LocationPickerComponent;
  @ViewChild(PropertyTypeComponent) propertyType!: PropertyTypeComponent;
  @ViewChild(PropertyDetailsComponent) propertyDetails!: PropertyDetailsComponent;
  @ViewChild('stepper') stepper!: MatStepper;

  isTypeSelected:boolean = false ;
  isValidDetails:boolean = false ;

  neighbours:Neighbours = {};

  constructor(private neighbour: NeighbourhoodService , private iconService: IconService) {}

  isLocationPicked(): boolean{
    if(this.locationPicker?.picked_location){
      return true ;
    } else {
      return false ;
    }
  }

  handleTypeSelection(value:string){
    if(value){
      this.isTypeSelected = true ;
    } else {
      this.isTypeSelected = false ;
    }
  }

  handleDetailsEdit(value:boolean){
    this.isValidDetails = value ;
  }

  reset(){
    try{
      this.locationPicker.resetMap();
      this.propertyType.form.reset();
      this.propertyDetails.landForm.reset();
      this.stepper!.reset();
    } catch(err){
      console.error('Failed to reset due to error : ' + err);
    }
  }

  predict(){
    // this.neighbours = this.neighbour.getNeighbours();
    let location : any = this.locationPicker.picked_location ;
    let lat:number = location.lat ;
    let lng:number = location.lng ;

    this.neighbour.fetchData(lat, lng).subscribe({
      next: (data: Neighbours) => {
        this.neighbours = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });








    this.stepper.next();
  }

  getIcon(key:string){
    return this.iconService.getIconByKey(key);
  }
}
