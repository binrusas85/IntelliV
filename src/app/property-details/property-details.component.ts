import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  landForm!: FormGroup;
  houseForm!: FormGroup;
  @Input() propertyTypeValue! : number ;
  @Output() valid = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForms();
  }

  ngOnChanges(): void {
    // React to changes in input properties
    this.initForms();
  }

  initForms(): void {
    if (this.propertyTypeValue == 2) {
      this.initializeLandForm();
    } else if (this.propertyTypeValue == 9) {
      this.initializeHouseForm();
    }
  }

  initializeLandForm() {
    this.landForm = this.fb.group({
      area: ['', [Validators.required, Validators.min(1)]],
      streetWidth: ['', [Validators.required, Validators.min(1)]],
      length: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]]
    });

    this.landForm.valueChanges.subscribe(() => {
      this.valid.emit(this.landForm.valid);
    });
  }

  initializeHouseForm() {
    this.houseForm = this.fb.group({
      area: ['', [Validators.required, Validators.min(1)]],
      streetWidth: ['', [Validators.required, Validators.min(1)]],
      length: ['', [Validators.required, Validators.min(1)]],
      width: ['', [Validators.required, Validators.min(1)]],
      beds: ['', [Validators.required, Validators.min(1)]],
      livings: ['', [Validators.required, Validators.min(1)]],
      wc: ['', [Validators.required, Validators.min(1)]],
      kitchen: [false],
      ac: [false],
      furnished: [false],
      daily_rentable: [false]
    });

    this.houseForm.valueChanges.subscribe(() => {
      this.valid.emit(this.houseForm.valid);
    });
  }
}
