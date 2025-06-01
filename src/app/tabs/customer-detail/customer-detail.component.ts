import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customer-detail',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="customer-detail p-3">
      <h3>Customer Details</h3>
      <div class="card">
        <div class="card-body" *ngIf="customer">
          <div class="row mb-2">
            <div class="col-3 fw-bold">Name:</div>
            <div class="col">{{customer.name}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Country:</div>
            <div class="col">{{customer.country?.name}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Representative:</div>
            <div class="col">{{customer.representative?.name}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Date:</div>
            <div class="col">{{customer.date}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Status:</div>
            <div class="col">
              <span [class]="'badge bg-' + getSeverity(customer.status)">
                {{customer.status}}
              </span>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Balance:</div>
            <div class="col">{{customer.balance}}</div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Activity:</div>
            <div class="col">
              <div class="progress">
                <div class="progress-bar" role="progressbar" 
                     [style.width.%]="customer.activity">
                  {{customer.activity}}%
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col-3 fw-bold">Verified:</div>
            <div class="col">
              <i class="bi" [class.bi-check-circle-fill]="customer.verified" 
                 [class.bi-x-circle-fill]="!customer.verified"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CustomerDetailComponent implements OnInit {
    customer: any;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        // In a real app, you would fetch the customer data using an ID
        // For now, we'll use the state navigation data
        const navigation = history.state;
        if (navigation && navigation.customer) {
            this.customer = navigation.customer;
        }
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
            case 'proposal':
                return 'danger';
            default:
                return 'secondary';
        }
    }
}