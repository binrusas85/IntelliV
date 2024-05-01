import { Component, SimpleChanges, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, 
    CommonModule, MatSelectModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})

export class PropertyDetailsComponent implements OnInit {
  propertyForm!: FormGroup;

  @Input() propertyTypeValue! : number ;
  @Output() valid = new EventEmitter<boolean>();

  visibilityStates = {
    area: true,
    streetWidth: true,
    length: true,
    width: true,
    beds: true,
    livings: true,
    wc: true,
    kitchen: true,
    ac: true,
    furnished: true,
    daily_rentable: true,
    rent_period: true
  };

  rent_periods: { value: number, label: string }[] = [
    {value: 1, label: "Daily"},
    {value: 2, label: "Monthly"},
    {value: 3, label: "Yearly"},
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  ngOnChanges(changes : SimpleChanges): void {
    // This method will be called whenever any input properties change
    // console.log('Changed properties:', changes);
    // if (changes['propertyTypeValue']) {
    //   console.log('someInput has changed:', changes['propertyTypeValue'].currentValue);
    // }
    this.initForms();
  }

  resetVisibility(){
    this.visibilityStates.area = true ;
    this.visibilityStates.area = true ;
    this.visibilityStates.streetWidth = true ;
    this.visibilityStates.length = true ;
    this.visibilityStates.width = true ;
    this.visibilityStates.beds = true ;
    this.visibilityStates.livings = true ;
    this.visibilityStates.wc = true ;
    this.visibilityStates.kitchen = true ;
    this.visibilityStates.rent_period = true;
    this.visibilityStates.ac = true ;
    this.visibilityStates.furnished = true ;
    this.visibilityStates.daily_rentable = true ;
  }

  initForms(): void {
    this.resetVisibility();
    this.initializePropertyForm();

    switch(this.propertyTypeValue){
      case 1:
        // Apartment, rental
        break;
      case 2:
        // Land, sell 
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false ;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('wc');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');        
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');

        break;
      case 3:
        // Villa, sell 
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false ;
        this.visibilityStates.rent_period = false;

        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');

        break;
      case 4:
        // Floor, rental
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('streetWidth');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 5:
        // Villa, rental
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 6:
        // Apartment, sell
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');

        break;
      case 7:
        // Building, sell
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false ;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');

        break;
      case 8:
        // Store, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 9:
        // House, sell
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');

        break;
      case 10:
        // Esterahah, sell 
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.beds = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('streetWidth');
        this.clearValidator('beds');
        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');
        
        break;
      case 11:
        // House, rental
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 12:
        // Farm, sell
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');

        break;
      case 13:
        // Esterahah, rental
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('streetWidth');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 14:
        // Office, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('wc');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 15:
        // Land, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('wc');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');
        
        break;
      case 16:
        // Building, rental
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('streetWidth');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 17:
        // Warehouse, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false;
        this.visibilityStates.streetWidth = false;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('wc');
        this.clearValidator('streetWidth');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');
        
        break;
      case 18:
        // Campsite, rental 
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false ;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('wc');
        this.clearValidator('streetWidth');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 19:
        // Room, rental 
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('streetWidth');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 20:
        // Store, sell
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.kitchen = false;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('beds');
        this.clearValidator('livings');
        this.clearValidator('wc');
        this.clearValidator('streetWidth');
        this.clearValidator('kitchen');
        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('daily_rentable');
        this.clearValidator('rent_period');

        break;
      case 21:
        // Furnished apartment
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
      case 22:
        // Floor, sell 
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.rent_period = false ;

        this.clearValidator('streetWidth');
        this.clearValidator('ac');
        this.clearValidator('furnished');
        this.clearValidator('rent_period');

        break;
      case 23:
        // Chalet, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;

        this.clearValidator('beds');
        this.clearValidator('streetWidth');
        this.clearValidator('ac');
        this.clearValidator('furnished');

        break;
    }
  }


  initializePropertyForm() {
    this.propertyForm = this.fb.group({
      area: ['', [Validators.required, Validators.min(1)]],
      streetWidth: ['', [Validators.required, Validators.min(1)]],
      length: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]],
      beds: ['', [Validators.required, Validators.min(1)]],
      livings: ['', [Validators.required, Validators.min(1)]],
      wc: ['', [Validators.required, Validators.min(1)]],
      rent_period: ['', [Validators.required]],
      kitchen: [false],
      ac: [false],
      furnished: [false],
      daily_rentable: [false]
    });

    this.propertyForm.valueChanges.subscribe(() => {
      this.valid.emit(this.propertyForm.valid);
    });

    this.propertyForm.get('rent_period')?.valueChanges.subscribe(selectedValue => {
      this.handleRentPeriodChange(selectedValue);
    });
  }


  handleRentPeriodChange(selectedValue: any) {
    console.log('Rent period changed to:', selectedValue);
    if(selectedValue == 1){
      this.propertyForm.get('daily_rentable')?.setValue(true);
    } else {
      this.propertyForm.get('daily_rentable')?.setValue(false);
    }
  }

  clearValidator(fieldCtrl: string) {
    let ctrl = this.propertyForm.get(fieldCtrl);

    if (ctrl) {
      ctrl.clearValidators();
      ctrl.updateValueAndValidity(); // Important to update validity
    }
  }
}
