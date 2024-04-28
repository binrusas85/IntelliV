import { Component, SimpleChanges, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatSlideToggleModule, 
    CommonModule],
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
    daily_rentable: true
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  ngOnChanges(changes : SimpleChanges): void {
    // This method will be called whenever any input properties change
    console.log('Changed properties:', changes);
    if (changes['propertyTypeValue']) {
      console.log('someInput has changed:', changes['propertyTypeValue'].currentValue);
    }
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
    this.visibilityStates.ac = true ;
    this.visibilityStates.furnished = true ;
    this.visibilityStates.daily_rentable = true ;
  }

  initForms(): void {
    this.resetVisibility();
    
    switch(this.propertyTypeValue){
      case 1:
        // Apartment, rental
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
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
        break;
      case 3:
        // Villa, sell 
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false ;
        break;
      case 4:
        // Floor, rental
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 5:
        // Villa, rental
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 6:
        // Apartment, sell
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        break;
      case 7:
        // Building, sell
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false ;
        break;
      case 8:
        // Store, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false;
        break;
      case 9:
        // House, sell
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        break;
      case 10:
        // Esterahah, sell 
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.beds = false ;
        break;
      case 11:
        // House, rental
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 12:
        // Farm, sell
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        this.visibilityStates.daily_rentable = false;
        break;
      case 13:
        // Esterahah, rental
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 14:
        // Office, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 15:
        // Land, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.wc = false ;
        this.visibilityStates.kitchen = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 16:
        // Building, rental
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
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
        break;
      case 19:
        // Room, rental 
        this.visibilityStates.beds = false ;
        this.visibilityStates.livings = false ;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
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
        break;
      case 21:
        // Furnished apartment
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 22:
        // Floor, sell 
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
      case 23:
        // Chalet, rental
        this.visibilityStates.beds = false ;
        this.visibilityStates.streetWidth = false ;
        this.visibilityStates.ac = false ;
        this.visibilityStates.furnished = false ;
        break;
    }
    this.initializePropertyForm();
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
      kitchen: [''],
      ac: [''],
      furnished: [''],
      daily_rentable: ['']
    });

    this.propertyForm.valueChanges.subscribe(() => {
      this.valid.emit(this.propertyForm.valid);
    });
  }
}
