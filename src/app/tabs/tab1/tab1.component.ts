import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TabsComponent } from '../tabs.component';

@Component({
    selector: 'app-tab1',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="table-container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Representative</th>
            <th>Status</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers" 
              (click)="onRowClick(customer)"
              style="cursor: pointer;">
            <td>{{customer.name}}</td>
            <td>{{customer.country.name}}</td>
            <td>{{customer.representative.name}}</td>
            <td>
              <span [class]="'badge bg-' + getSeverity(customer.status)">
                {{customer.status}}
              </span>
            </td>
            <td>
              <div class="progress">
                <div class="progress-bar" role="progressbar" 
                     [style.width.%]="customer.activity">
                  {{customer.activity}}%
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
    styles: [`
    .table-container {
      padding: 1rem;
    }
  `]
})
export class Tab1Component {
    customers = [
        {
            id: '1',
            name: 'John Doe',
            country: { name: 'USA' },
            representative: { name: 'Amy Elsner' },
            status: 'qualified',
            activity: 75,
            verified: true,
            balance: 50000,
            date: '2023-01-01'
        },
        // Add more sample customers as needed
    ];

    constructor(
        private router: Router,
        private tabsComponent: TabsComponent
    ) { }

    onRowClick(customer: any) {
        this.tabsComponent.addTab(customer.id, customer.name);
        this.router.navigate(['/tabs/detail', customer.id], {
            state: { customer }
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
            case 'proposal':
                return 'danger';
            default:
                return 'secondary';
        }
    }
}