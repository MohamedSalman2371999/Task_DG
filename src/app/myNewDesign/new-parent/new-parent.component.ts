import { CommonModule, NgFor } from '@angular/common';
import { Component, ComponentRef, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
import { SplitterModule } from 'primeng/splitter';
import { NewChildComponent } from '../new-child/new-child.component';
import { Share } from '../../share';

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
  selector: 'app-new-parent',
  standalone: true,
  imports: [
    NgFor,
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
  templateUrl: './new-parent.component.html',
  styleUrl: './new-parent.component.scss'
})
export class NewParentComponent {
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
  ngOnInit() {
  this.restoreTabsFromStorage();
}

ngOnDestroy() {
  this.tabRefs.forEach(ref => ref.destroy());
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
severity!:any
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
 @ViewChild('tabContainer', { read: ViewContainerRef, static: true })
  tabContainer!: ViewContainerRef;

  tabRefs: ComponentRef<any>[] = [];
  activeTab = -1;
  showSidebar = 0;
  users: any[] = [];
  leftWidth = 100;

  openTab(user: { id: number; name: string; email: string }) {
    if (!this.tabContainer) {
      console.error('TabContainer is not available');
      return;
    }
    const existingIndex = this.users.findIndex(u => u.id === user.id);
    if (existingIndex !== -1) {
      this.activateTab(existingIndex);
      return;
    }
    this.users.push(user);
     this.createTabComponent(user);

       this.saveTabsToStorage();

    this.activateTab(this.users.length - 1);
    }

  private createTabComponent(user: { id: number; name: string; email: string }) {
  const ref = this.tabContainer.createComponent(NewChildComponent);
  ref.setInput('data', user);
  
  ref.location.nativeElement.style.display = 'none';
  ref.location.nativeElement.classList.add('dynamic-tab-panel');
  
  this.tabRefs.push(ref);
}
  activateTab(index: number) {
    this.activeTab = index;
    
    this.tabRefs.forEach(ref => {
      ref.location.nativeElement.style.display = 'none';
    });
    
    if (index >= 0 && this.tabRefs[index]) {
      this.tabRefs[index].location.nativeElement.style.display = 'block';
    }
    this.saveTabsToStorage();
    if (index === -1) {
      console.log('Activated default parent tab');
    } else {
      console.log('Activated tab:', index, 'User:', this.users[index]?.name);
    }
  }

  removeTab(index: number) {
    console.log('Removing tab:', index, 'User:', this.users[index]?.name);
    
    if (this.tabRefs[index]) {
      this.tabRefs[index].destroy();
    }
    
    this.tabRefs.splice(index, 1);
    this.users.splice(index, 1);
  this.saveTabsToStorage();
    if (this.activeTab === index) {
      this.activeTab = -1;
    } else if (this.activeTab > index) {
      this.activeTab--;
    }
  }
private saveTabsToStorage() {
  try {
      if(typeof(localStorage) !== 'undefined'){
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('activeTab', JSON.stringify(this.activeTab));
      }
    console.log('Tabs saved to storage');
  } catch (error) {
    console.error('Error saving tabs to storage:', error);
  }
}

private restoreTabsFromStorage() {
  try {
      if(typeof(localStorage) !== 'undefined'){
        const savedUsers = localStorage.getItem('users');
        const savedActiveTab = localStorage.getItem('activeTab');
        
        if (savedUsers) {
          this.users = JSON.parse(savedUsers);
      }
      
      this.users.forEach(user => {
        this.createTabComponent(user);
      });
      
      if (savedActiveTab) {
        const activeIndex = JSON.parse(savedActiveTab);
        if (activeIndex >= 0 && activeIndex < this.users.length) {
          this.activateTab(activeIndex);
        }
      }
      
      console.log('Tabs restored from storage:', this.users.length);
    }
  } catch (error) {
    console.error('Error restoring tabs from storage:', error);
  }
}

clearAllTabs() {
  this.tabRefs.forEach(ref => ref.destroy());
  this.tabRefs = [];
  this.users = [];
  this.activeTab = -1;
  
  if(typeof(localStorage) !== 'undefined'){
    localStorage.removeItem('users');
    localStorage.removeItem('activeTab');

  }
  console.log('All tabs cleared');
}
// ... existing properties ...
  
  // Drag and drop properties
  dragIndex: number = -1;
  dragOverIndex: number = -1;
  
  // ... existing methods ...

  onDragStart(event: DragEvent, index: number) {
    this.dragIndex = index;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', index.toString());
    }
    
    // Add visual feedback
    const dragElement = event.target as HTMLElement;
    dragElement.style.opacity = '0.5';
  }

  onDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  onDragEnter(event: DragEvent, index: number) {
    event.preventDefault();
    if (this.dragIndex !== index) {
      this.dragOverIndex = index;
    }
  }

  onDragLeave(event: DragEvent) {
    // Only clear drag over when actually leaving the element
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX;
    const y = event.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      this.dragOverIndex = -1;
    }
  }

  onDrop(event: DragEvent, dropIndex: number) {
    event.preventDefault();
    
    if (this.dragIndex !== -1 && this.dragIndex !== dropIndex) {
      this.moveTab(this.dragIndex, dropIndex);
    }
    
    this.dragOverIndex = -1;
  }

  onDragEnd(event: DragEvent) {
    // Reset visual feedback
    const dragElement = event.target as HTMLElement;
    dragElement.style.opacity = '1';
    
    this.dragIndex = -1;
    this.dragOverIndex = -1;
  }

  private moveTab(fromIndex: number, toIndex: number) {
    // Move user data
    const movedUser = this.users.splice(fromIndex, 1)[0];
    this.users.splice(toIndex, 0, movedUser);
    
    // Move component reference
    const movedComponent = this.tabRefs.splice(fromIndex, 1)[0];
    this.tabRefs.splice(toIndex, 0, movedComponent);
    
    // Update active tab index
    if (this.activeTab === fromIndex) {
      this.activeTab = toIndex;
    } else if (this.activeTab > fromIndex && this.activeTab <= toIndex) {
      this.activeTab--;
    } else if (this.activeTab < fromIndex && this.activeTab >= toIndex) {
      this.activeTab++;
    }
    
    // Save to storage
    this.saveTabsToStorage();
    
    console.log(`Moved tab from index ${fromIndex} to ${toIndex}`);
  }

  // Enhanced method to handle keyboard navigation
  onTabKeydown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        if (index > 0) {
          this.moveTab(index, index - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (index < this.users.length - 1) {
          this.moveTab(index, index + 1);
        }
        break;
      case 'Home':
        event.preventDefault();
        if (index > 0) {
          this.moveTab(index, 0);
        }
        break;
      case 'End':
        event.preventDefault();
        if (index < this.users.length - 1) {
          this.moveTab(index, this.users.length - 1);
        }
        break;
    }
  }
}
