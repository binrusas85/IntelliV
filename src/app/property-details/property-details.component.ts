import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.scss'
})
export class PropertyDetailsComponent implements OnInit {
  landForm!: FormGroup;
  @Output() valid = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.landForm = new FormGroup({
      area: new FormControl('', [Validators.required, Validators.min(1)]),
      streetWidth: new FormControl('', [Validators.required, Validators.min(1)]),
      length: new FormControl('', [Validators.required, Validators.min(1)]),
      width: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.onFormChanges();
  }

  onFormChanges(): void {
    this.landForm.valueChanges.subscribe(val => {
      this.formChangeHandler(val);
    });
  }

  formChangeHandler(values: any): void {
    console.log('Form values changed:', values);
    this.valid.emit(this.landForm.valid);    
  }
}
