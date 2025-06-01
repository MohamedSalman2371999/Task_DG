import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Tab {
  path: string;
  title: string;
  id?: string;
  isCloseable?: boolean;
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="tabs-container">
      <ul class="nav nav-tabs">
        <li class="nav-item" *ngFor="let tab of tabs">
          <a class="nav-link d-flex align-items-center" 
             [routerLink]="['/tabs', tab.path]" 
             routerLinkActive="active">
            {{tab.title}}
            <button *ngIf="tab.isCloseable" 
                    class="btn-close ms-2" 
                    (click)="closeTab(tab, $event)">
            </button>
          </a>
        </li>
      </ul>
      
      <div class="tab-content p-3">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .tabs-container {
      padding: 20px;
    }
    .tab-content {
      border: 1px solid #dee2e6;
      border-top: none;
      min-height: 300px;
    }
    .nav-link {
      padding-right: 1rem;
    }
    .btn-close {
      font-size: 0.75rem;
      padding: 0.25rem;
    }
  `]
})
export class TabsComponent {
  tabs: Tab[] = [
    { path: 'tab1', title: 'Customer List' }
  ];

  constructor(private router: Router) {}

  addTab(customerId: string, customerName: string) {
    const path = `detail/${customerId}`;
    if (!this.tabs.find(tab => tab.path === path)) {
      this.tabs.push({
        path,
        title: `Details: ${customerName}`,
        id: customerId,
        isCloseable: true
      });
    }
    this.router.navigate(['/tabs', path]);
  }

  closeTab(tab: Tab, event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const index = this.tabs.indexOf(tab);
    if (index > -1) {
      this.tabs.splice(index, 1);
      
      // Navigate to the previous tab or the first tab if we're closing the first closeable tab
      if (this.tabs.length > 0) {
        const newTab = this.tabs[Math.max(0, index - 1)];
        this.router.navigate(['/tabs', newTab.path]);
      }
    }
  }
}