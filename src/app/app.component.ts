import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { ParentTabComponent } from "./parent-tab/parent-tab.component";
import { ChildTabComponent } from './child-tab/child-tab.component';
import { SplitterModule } from 'primeng/splitter';
import { NewParentComponent } from "./myNewDesign/new-parent/new-parent.component";      
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    InputSwitchModule,
    TagModule,
    ProgressBarModule,
    SplitterModule,
],
  providers: [ConfirmationService, MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) 
  dynamicComponent!: ViewContainerRef;

  Designs = [
    { name: 'Design 1', value: 'design1', component: NewParentComponent },
    { name: 'Design 2', value: 'design2', component: ParentTabComponent }
  ];
  
  selectedDesign: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  onDesignChange() {
    if (this.selectedDesign && this.selectedDesign.component) {
      this.dynamicComponent.clear();
      const componentFactory = this.componentFactoryResolver
        .resolveComponentFactory(this.selectedDesign.component);
      this.dynamicComponent.createComponent(componentFactory);
    }
  }

}