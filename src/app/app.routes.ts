import { Routes } from '@angular/router';
import { DataEntryComponent } from './pages/data-entry-component/data-entry-component';
import { OverviewPage } from './pages/overview-page/overview-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'data-entry',
  },
  {
    path: 'data-entry',
    component: DataEntryComponent,
  },
  {
    path: 'overview',
    component: OverviewPage,
  },
];
