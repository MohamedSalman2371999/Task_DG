import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Step1Component } from '../step1/step1.component';
import { Step2Component } from '../step2/step2.component';
import { Step3Component } from '../step3/step3.component';
import { ButtonModule } from 'primeng/button';
import { Stepper, StepperModule } from 'primeng/stepper';
import { Subject, timer } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-steps-container',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepperModule,
    ButtonModule
  ],
  templateUrl: './steps-container.component.html',
  styleUrl: './steps-container.component.scss'
})
export class StepsContainerComponent implements OnInit {
currentStep = 0;
  readonly STORAGE_KEY = 'kt_stepper_current_step';

  ngOnInit() {
    // Restore saved step on init
    const savedStep = localStorage.getItem(this.STORAGE_KEY);
    this.currentStep = savedStep ? +savedStep : 0;
  }

  goToStep(index: number) {
    this.currentStep = index;
    this.saveStep();
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
      this.saveStep();
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.saveStep();
    }
  }

  submit() {
    alert('Form submitted!');
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private saveStep() {
    localStorage.setItem(this.STORAGE_KEY, this.currentStep.toString());
  }
}
