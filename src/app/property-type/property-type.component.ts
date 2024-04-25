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
  @Output() type = new EventEmitter<number>();
  form! : FormGroup; 
  
  types: { value: number, label: string }[] = [
    {value: 1, label: "Apartment, rental"},
    {value: 2, label: "Land, sell"},
    {value: 3, label: "Villa, sell"},
    {value: 4, label: "Floor, rental"},
    {value: 5, label: "Villa, rental"},
    {value: 6, label: "Apartment, sell"},
    {value: 7, label: "Building, sell"},
    {value: 8, label: "Store, rental"},
    {value: 9, label: "House, sell"},
    {value: 10, label: "Esterahah, sell"},
    {value: 11, label: "House, rental"},
    {value: 12, label: "Farm, sell"},
    {value: 13, label: "Esterahah, rental"},
    {value: 14, label: "Office, rental"},
    {value: 15, label: "Land, rental"},
    {value: 16, label: "Building, rental"},
    {value: 17, label: "Warehouse, rental"},
    {value: 18, label: "Campsite, rental"},
    {value: 19, label: "Room, rental"},
    {value: 20, label: "Store, sell"},
    {value: 21, label: "Furnished apartment"},
    {value: 22, label: "Floor, sell"},
    {value: 23, label: "Chalet, rental"}
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
