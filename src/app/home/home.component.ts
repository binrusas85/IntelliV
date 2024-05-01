import { ValuationService } from './../valuation.service';
import { Neighbours } from '../utils/neighbours';
import { Component, OnDestroy, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { LoadingComponent } from '../loading/loading.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ValuationRequest } from '../utils/valuationRequest';
import { Subscription } from 'rxjs';
import { Model, ModelService } from '../shared/model.service';
import { Valuation } from '../utils/valuation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LocationPickerComponent, PropertyTypeComponent, PropertyDetailsComponent
    , MatStepperModule, MatButtonModule, CommonModule, KeyValuePipe, MatDividerModule
    , MatIconModule, FormatPlacePipe, LoadingComponent, NgxSkeletonLoaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild(LocationPickerComponent) locationPicker!: LocationPickerComponent;
  @ViewChild(PropertyTypeComponent) propertyType!: PropertyTypeComponent;
  @ViewChild(PropertyDetailsComponent) propertyDetails!: PropertyDetailsComponent;
  @ViewChild('stepper') stepper!: MatStepper;

  selectedModel: Model | null = null;
  private modelSubscription!: Subscription;

  isLocationPicked:boolean = false ;
  isTypeSelected:boolean = false ;
  isValidDetails:boolean = false ;
  isLoading:boolean = false ;

  price : number = 0; 
  neighbours:Neighbours = {};

  propertyTypeValue: number = 2

  constructor(private valuationService: ValuationService , private iconService: IconService, 
    private cd: ChangeDetectorRef, private modelService: ModelService) {}

  ngOnInit() {
    this.modelSubscription = this.modelService.getSelectedModel().subscribe(model => {
      this.selectedModel = model;
    });
  }

  ngOnDestroy() {
    this.modelSubscription.unsubscribe();
  }

  handleLocationPick(value:boolean){
    console.log(`Location is picked = ${value}`)
    this.isLocationPicked = value ;
    this.cd.detectChanges();  // Manually trigger change detection
    console.log(`this.isLocationPicked = ${this.isLocationPicked}`)
  }

  handleTypeSelection(value:number){
    if(value){
      this.propertyTypeValue = value
      console.log(`Propery type value : ${this.propertyTypeValue}`)
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
      this.neighbours = {};
      this.locationPicker.resetMap();
      this.propertyType.form.reset();
      this.propertyDetails.propertyForm.reset();
      this.stepper.reset();
    } catch(err){
      console.error('Failed to reset due to error : ' + err);
    }
  }

  predict(){
    this.isLoading = true ;

    let location : any = this.locationPicker.picked_location ;
    let lat:number = location.lat ;
    let lng:number = location.lng ;

    let street_width = 0;
    try{
      let streetWidthCtrl = this.propertyDetails.propertyForm.get('streetWidth')
      street_width =  streetWidthCtrl && streetWidthCtrl.value ? streetWidthCtrl.value : 0; 
    } catch(err){}

    let area = 0 ;
    try{
      let areaCtrl = this.propertyDetails.propertyForm.get('area')
      area =  areaCtrl && areaCtrl.value ? areaCtrl.value : 0; 
    } catch(err){}


    let length = 0;
    try{
      let lengthCtrl = this.propertyDetails.propertyForm.get('length')
      length =  lengthCtrl && lengthCtrl.value ? lengthCtrl.value : 0; 
    } catch(err){}


    let width = 0;
    try{
      let widthCtrl = this.propertyDetails.propertyForm.get('width')
      width =  widthCtrl && widthCtrl.value ? widthCtrl.value : 0;   
    } catch(err){}

    let beds = 0
    try{
      let bedsCtrl = this.propertyDetails.propertyForm.get('beds')
      beds =  bedsCtrl && bedsCtrl.value ? bedsCtrl.value : 0; 
      console.log(`beds = ${beds}`)
    } catch (err){
      console.error('Failed to get beds');
    }

    let livings = 0 ;
    try{
      let livingsCtrl = this.propertyDetails.propertyForm.get('livings')
      livings =  livingsCtrl && livingsCtrl.value ? livingsCtrl.value : 0;   
    } catch(err){}

    let wc = 0 ;
    try{
      let wcCtrl = this.propertyDetails.propertyForm.get('wc')
      wc =  wcCtrl && wcCtrl.value ? wcCtrl.value : 0;   
    } catch(err){}

    let kitchen = 0 ;
    try{
      let kitchenCtrl = this.propertyDetails.propertyForm.get('kitchen')
      kitchen =  kitchenCtrl && kitchenCtrl.value ? +kitchenCtrl.value : 0;   
    } catch(err){}

    let rent_period = 0 ;
    try{
      let rent_period_Ctrl = this.propertyDetails.propertyForm.get('rent_period')
      rent_period =  rent_period_Ctrl && rent_period_Ctrl.value ? +rent_period_Ctrl.value : 0; 
    } catch(err){}

    let ac = 0 ;
    try{
      let acCtrl = this.propertyDetails.propertyForm.get('ac')
      ac =  acCtrl && acCtrl.value ? +acCtrl.value : 0; 
    } catch(err){}

    let furnished = 0 ;
    try{
      let furnishedCtrl = this.propertyDetails.propertyForm.get('furnished')
      furnished =  furnishedCtrl && furnishedCtrl.value ? +furnishedCtrl.value : 0;   
    } catch(err){}

    let daily_rentable = 0;
    try{
      let daily_rentableCtrl = this.propertyDetails.propertyForm.get('daily_rentable')
      daily_rentable =  daily_rentableCtrl && daily_rentableCtrl.value ? +daily_rentableCtrl.value : 0; 
    } catch(err){}

    let request: ValuationRequest = {
      model: this.selectedModel?.name,
      lat: lat,
      lng: lng,
      category: this.propertyTypeValue,
      street_width: street_width,
      area: area,
      length: length,
      width: width,
      beds: beds,
      livings: livings,
      wc: wc,
      rent_period: rent_period,
      kitchen: kitchen,
      ac: ac,
      furnished: furnished,
      daily_rentable: daily_rentable,
      city_id: 0,
      district_id: 0,
      moderate_neighbours: 0,
      high_neighbours: 0
    }

    console.log(JSON.stringify(request));

    this.valuationService.sendData(request).subscribe({
      next: async (data: Valuation) => {
        this.neighbours = data.neighbours;
        this.price = data.price ;
        this.isLoading = false ;
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
