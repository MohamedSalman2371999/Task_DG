import { ComponentFactoryResolver } from '@angular/core';
import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { Tab1Component } from './tabs/tab1/tab1.component';
import { Tab2Component } from './tabs/tab2/tab2.component';
import { Tab3Component } from './tabs/tab3/tab3.component';
import { CustomerDetailComponent } from './tabs/customer-detail/customer-detail.component';
import { ParentTabComponent } from './parent-tab/parent-tab.component';
import { NewParentComponent } from './myNewDesign/new-parent/new-parent.component';
import { StoreFormsValueComponent } from './store-forms-value/store-forms-value.component';
import { canDeactivateGuard } from './gards/can-deactivate.guard';
import { StepsContainerComponent } from './ForTestingSteps/steps-container/steps-container.component';

// path: 'tabs',
// component: TabsComponent,
// children: [
//     { path: 'tab1', component: Tab1Component },
//     { path: 'tab2', component: Tab2Component },
//     { path: 'tab3', component: Tab3Component },
//     { path: 'detail/:id', component: CustomerDetailComponent },
//     { path: '', redirectTo: 'tab1', pathMatch: 'full' }
// ]
// },
export const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: '1', component: ParentTabComponent },
  { path: '2', component: NewParentComponent },
  {
    path: '3', loadComponent: () => import('../app/store-forms-value/store-forms-value.component').then(m => m.StoreFormsValueComponent),
    canDeactivate: [canDeactivateGuard]
  },
  { path: '4', component: StepsContainerComponent }
];
