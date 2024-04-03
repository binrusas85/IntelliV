import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-type',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule, 
    ReactiveFormsModule, CommonModule],
  templateUrl: './property-type.component.html',
  styleUrl: './property-type.component.scss'
})
export class PropertyTypeComponent implements OnInit {
  @Output() type = new EventEmitter<string>();
  form! : FormGroup; 
  
  types: { value: string, label: string }[] = [
    { value: 'land', label: 'Land' },
    { value: 'building', label: 'Building' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
  ];

  ngOnInit(){
   this.form = new FormGroup({
      propertyCtrl: new FormControl('', Validators.required),
    });

    this.form.get('propertyCtrl')?.valueChanges.subscribe(selectedValue => {
      this.handlePropertyTypeChange(selectedValue);
    });
  }

  handlePropertyTypeChange(selectedValue: any) {
    console.log('Property type changed to:', selectedValue);
    this.type.emit(selectedValue);
  }

}
