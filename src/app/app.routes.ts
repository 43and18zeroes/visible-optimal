import { Routes } from '@angular/router';
import { OverviewPage } from './pages/overview-page/overview-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'overview',
  },
  {
    path: 'overview',
    component: OverviewPage,
  },
];
