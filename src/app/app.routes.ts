import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./modules/home/home.component').then(c => c.HomeComponent)
  },
  { 
    path: 'about', 
    loadComponent: () => import('./modules/about/about.component').then(c => c.AboutComponent)
  },
  { 
    path: 'client/dashboard', 
    loadComponent: () => import('./modules/client/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  { 
    path: 'expert/dashboard', 
    loadComponent: () => import('./modules/expert/dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  { path: '**', redirectTo: '/home' }
];