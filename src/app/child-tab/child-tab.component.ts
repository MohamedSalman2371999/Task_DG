import { CommonModule } from '@angular/common';
import { Component, ComponentRef, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
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

interface Customer {
  id: number;
  name: string;
  country: Country;
  representative: Representative;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  balance: number;
}

interface Country {
  name: string;
  code: string;
}

interface Representative {
  name: string;
  image: string;
}
@Component({
  selector: 'app-child-tab',
  standalone: true,
  imports: [
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
],
  templateUrl: './child-tab.component.html',
  styleUrl: './child-tab.component.scss'
})
export class ChildTabComponent {
  @Input() data!: { id: number; name: string;};
  @Output() closed = new EventEmitter<void>();

    formFields = [
      { type: 'text', label: 'Name', name: 'name', required: true },
      { type: 'email', label: 'Email', name: 'email', required: true },
      { type: 'number', label: 'Age', name: 'age', required: false },
      { type: 'password', label: 'Password', name: 'password', required: true }
    ];
    form3!: FormGroup;
    fields = this.formFields;
  
    form!: FormGroup;
    countries = ['USA', 'India'];
    states: string[] = [];
    countryStateMap: Record<string, string[]> = {
      USA: ['California', 'Texas', 'Florida'],
      India: ['Maharashtra', 'Delhi', 'Karnataka']
    };
    // columns: string[] = [];
    // data: any[] = [];
  
    form1!: FormGroup;
    ngOnInit() {
      this.updatePagination();
  
      // this.data = [
      //   { name: 'Alice', age: 25, country: 'USA' },
      //   { name: 'Bob', age: 30, country: 'Canada' },
      //   { name: 'Charlie', age: 22, country: 'UK' }
      // ];
  
      // this.columns = Object.keys(this.data[0]);
      console.log(this.columns);
  
  
      this.form = this.fb.group({
        country: [''],
        state: ['']
      });
  
      this.form.get('country')?.valueChanges.subscribe(country => {
        this.states = this.countryStateMap[country] || [];
      });
  
      this.form1 = this.fb.group({
        emails: this.fb.array([this.fb.control('')])
      });
  
      const formGroup: any = {};
      this.fields.forEach(field => {
        if (field.required) {
          formGroup[field.name] = [null, Validators.required];
        } else {
          formGroup[field.name] = [null];
        }
      });
      this.form3 = this.fb.group(formGroup);
    }
  
  
    get emails() {
      return this.form1.get('emails') as FormArray;
    }
  
    addField() {
      this.emails.push(this.fb.control(''));
    }
  
    removeField(index: number) {
      this.emails.removeAt(index);
    }
  
    onSubmit() {
      console.log(this.form1.value);
    }
  
    onSubmit3() {
      if (this.form3.valid) {
        console.log('Form Value:', this.form3.value);
      } else {
        console.log('Form Invalid');
      }
    }
  
    customers = [
      {
        id: 1000,
        name: 'James Smith',
        country: { name: 'USA', code: 'us' },
        representative: { name: 'Amy Elsner', image: 'amyelsner.png' },
        date: '2020-05-01',
        status: 'qualified',
        verified: true,
        activity: 80,
        balance: 120500
      },
      {
        id: 1001,
        name: 'Maria Rodriguez',
        country: { name: 'Mexico', code: 'mx' },
        representative: { name: 'Anna Fali', image: 'annafali.png' },
        date: '2020-06-15',
        status: 'new',
        verified: false,
        activity: 45,
        balance: 85000
      },
      {
        id: 1002,
        name: 'David Wilson',
        country: { name: 'Canada', code: 'ca' },
        representative: { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
        date: '2020-07-20',
        status: 'negotiation',
        verified: true,
        activity: 95,
        balance: 220500
      },
      {
        id: 1003,
        name: 'Sophie Turner',
        country: { name: 'UK', code: 'gb' },
        representative: { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        date: '2020-08-10',
        status: 'renewal',
        verified: true,
        activity: 75,
        balance: 165000
      },
      {
        id: 1004,
        name: 'Hans Weber',
        country: { name: 'Germany', code: 'de' },
        representative: { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        date: '2020-09-25',
        status: 'proposal',
        verified: false,
        activity: 60,
        balance: 95400
      }
    ];
  
    columns = [
      { field: 'name', header: 'Name' },
      { field: 'country.name', header: 'Country' },
      { field: 'representative.name', header: 'Agent' },
      { field: 'date', header: 'Date' },
      { field: 'balance', header: 'Balance' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' },
      { field: 'verified', header: 'Verified' }
    ];
  
    loading: boolean = false;
    searchValue: string = '';
    filteredCustomers: Customer[] = [];
  
    searchText: string = '';
    pageSize: number = 10;
    currentPage: number = 1;
    totalPages: number = 1;
  
    clear(table: any) {
      table.clear();
      this.searchValue = '';
    }
  
    editingCustomer: Customer | null = null;
    deleteCustomerId: number | null = null;
    displayEditDialog: boolean = false;
    editForm: FormGroup;
  
    constructor(
      private fb: FormBuilder,
      private confirmationService: ConfirmationService,
      private messageService: MessageService
    ) {
      this.editForm = this.fb.group({
        name: ['', Validators.required],
        country: ['', Validators.required],
        representative: ['', Validators.required],
        date: ['', Validators.required],
        status: ['', Validators.required],
        balance: [0, Validators.required],
        activity: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
        verified: [false]
      });
    }
  
    getSeverity(status: string): string {
      switch (status?.toLowerCase()) {
        case 'qualified':
          return 'success';
        case 'new':
          return 'info';
        case 'negotiation':
          return 'warning';
        case 'renewal':
          return 'primary';
        default:
          return 'danger';
      }
    }
  
    getFormErrors(fieldName: string): string[] {
      const control = this.editForm.get(fieldName) || null;
      if (control && control.errors && (control.dirty || control.touched)) {
        return Object.keys(control.errors).map(key => {
          switch (key) {
            case 'required':
              return `${fieldName} is required`;
            case 'min':
            // return `${fieldName} must be at least ${control.errors[key].min}`;
            case 'max':
            // return `${fieldName} must be at most ${control.errors[key].max}`;
            default:
              return `${fieldName} is invalid`;
          }
        });
      }
      return [];
    }
  
    onEdit(customer: Customer) {
      console.log(customer);
      
      this.editingCustomer = { ...customer };
      this.editForm.patchValue({
        name: customer.name,
        country: customer.country.name,
        representative: customer.representative.name,
        date: customer.date,
        status: customer.status,
        balance: customer.balance,
        activity: customer.activity,
        verified: customer.verified
      });
      this.displayEditDialog = true;
    }
  
    saveEdit() {
      if (this.editForm.invalid) {
        Object.keys(this.editForm.controls).forEach(key => {
          const control = this.editForm.get(key);
          if (control) {
            control.markAsTouched();
          }
        });
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please correct all errors before saving' });
        return;
      }
  
      if (this.editingCustomer) {
        const index = this.customers.findIndex(c => c.id === this.editingCustomer!.id);
        if (index !== -1) {
          const formValue = this.editForm.value;
          this.customers[index] = {
            ...this.editingCustomer,
            name: formValue.name,
            country: { name: formValue.country, code: this.editingCustomer.country.code },
            representative: { name: formValue.representative, image: this.editingCustomer.representative.image },
            date: formValue.date,
            status: formValue.status,
            balance: formValue.balance,
            activity: formValue.activity,
            verified: formValue.verified
          };
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer updated' });
          this.displayEditDialog = false;
          this.editingCustomer = null;
          this.editForm.reset();
        }
      }
    }
  
    onDelete(customer: Customer) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this customer?',
        accept: () => {
          this.customers = this.customers.filter(c => c.id !== customer.id);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer deleted' });
        }
      });
    }
  
    filterTable() {
      // Filtering logic will be implemented if needed
    }
  
    updatePagination() {
      this.totalPages = Math.ceil(this.customers.length / this.pageSize);
    }
  
    goToFirstPage() {
      this.currentPage = 1;
      this.updatePagination();
    }
  
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePagination();
      }
    }
  
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.updatePagination();
      }
    }
  
    goToLastPage() {
      this.currentPage = this.totalPages;
      this.updatePagination();
    }
  
    onGlobalFilter(event: Event, table: any) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
  
}
