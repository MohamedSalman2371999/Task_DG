import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-store-forms-value',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './store-forms-value.component.html',
  styleUrl: './store-forms-value.component.scss'
})
export class StoreFormsValueComponent  {
   formFields:any[]= [
      {
        id: 'Category',
        type: 'radio',
        label: 'Category',
        required: true,
        options: [
          { value: 'electronics', label: 'Electronics' },
          { value: 'clothing', label: 'Clothing' },
          { value: 'books', label: 'Books' },
          { value: 'home', label: 'Home & Garden' }
        ]
      },
      {
        id: 'Brand',
        type: 'dropdown',
        label: 'Brand',
        required: true,
        options: [
          { value: 'apple', label: 'Apple' },
          { value: 'samsung', label: 'Samsung' },
          { value: 'nike', label: 'Nike' },
          { value: 'adidas', label: 'Adidas' }
        ]
      },
      {
        id: 'Color',
        type: 'dropdown',
        label: 'Color',
        required: false,
        options: [
          { value: 'red', label: 'Red' },
          { value: 'blue', label: 'Blue' },
          { value: 'green', label: 'Green' },
          { value: 'black', label: 'Black' }
        ]
      },
      {
        id: 'Size',
        type: 'radio',
        label: 'Size',
        required: false,
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
          { value: 'xl', label: 'Extra Large' }
        ]
      },
      { id: 'Name',type: 'text', label: 'Name', name: 'name', required: true },
      { id: 'Email',type: 'email', label: 'Email', name: 'email', required: true },
      { id: 'Age',type: 'number', label: 'Age', name: 'age', required: false },
      { id: 'Password',type: 'password', label: 'Password', name: 'password', required: true },
    ]
    
userForm!: FormGroup

private destroy$ = new Subject<void>();
  saveStatus = 'Ready';
  lastSaved: Date | null = null;
  
  private readonly STORAGE_KEY = 'userFormData';

  constructor(private fb: FormBuilder,private route:Router) {
    const fromData:any ={} 
    this.formFields.forEach((field:any) => {
      if (field.required) {
          fromData[field.id] = ['', Validators.required];
      }else{
        fromData[field.id] = [''];
      }
    })
    this.userForm = this.fb.group(fromData);
    console.log('Form initialized with fields:', this.userForm);
  }

  ngOnInit() {
    this.restoreFormData();    
    this.setupAutoSave();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private setupAutoSave() {
    this.userForm.valueChanges.pipe(
      debounceTime(1000),
      takeUntil(this.destroy$)
    ).subscribe(formData => {
      this.saveFormData(formData);
    });
  }

  private saveFormData(formData: any) {
    try {
      this.saveStatus = 'Saving';
      if(typeof localStorage !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(formData));
      }
      
      this.saveStatus = 'Saved';
      this.lastSaved = new Date();
      
      console.log('Form data saved successfully:', formData);
      
    } catch (error) {
      this.saveStatus = 'Error';
      console.error('Error saving form data:', error);
    }
  }

  private restoreFormData() {
    try {
        if(typeof localStorage !== 'undefined') {
            const savedData = localStorage.getItem(this.STORAGE_KEY);
            
            if (savedData) {
              const formData = JSON.parse(savedData);
              
              // Restore all form field values
              this.userForm.patchValue(formData);
              
              this.saveStatus = 'Restored';
              console.log('Form data restored successfully:', formData);
                    
            }
          
        setTimeout(() => {
          this.saveStatus = 'Ready';
        }, 3000);
        
      } else {
        console.log('No saved form data found');
        this.saveStatus = 'Ready';
      }
      
    } catch (error) {
      console.error('Error restoring form data:', error);
      this.saveStatus = 'Error';
    }
  }

  clearForm() {
    this.userForm.reset();
    this.saveStatus = 'Cleared';
    setTimeout(() => {
      this.saveStatus = 'Ready';
    }, 2000);
  }
  onSubmit() {
    if (this.userForm.valid || !this.userForm.valid) {
      console.log('Form submitted:', this.userForm.value);
      alert('Form submitted successfully! Saved data has been cleared.');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
    isDirty = true; // Set to true when user makes unsaved changes

  canDeactivate(): boolean {
    return !this.isDirty;
  }
navegateToTab1() {
  this.route.navigate(['/1']);
}
}

