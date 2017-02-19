import { Routes } from '@angular/router';
import { AllowComponent } from './allow/allow.component';
import { HomeComponent } from './home/home.component';
import { InvestorComponent } from './investor/investor.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'allow/:keyword', component: AllowComponent },
  { path: 'investor', component: InvestorComponent },
  {path: '**', redirectTo: 'home'}
];

