import { Routes } from '@angular/router';

export const routes: Routes = [
  // Auth routes
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.authRoutes)
  },
  
  // Client routes
  {
    path: 'client',
    loadChildren: () => import('./modules/client/client.routes').then(m => m.CLIENT_ROUTES)
  },
  
  // Expert routes
  {
    path: 'expert',
    loadChildren: () => import('./modules/expert/expert.routes').then(m => m.EXPERT_ROUTES)
  },
  
  // About route
  {
    path: 'about',
    loadChildren: () => import('./modules/about/about.routes').then(m => m.aboutRoutes)
  },
  
  // Home route
  {
    path: '',
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent)
  },
  
  // 404 fallback - must be last
  {
    path: '**',
    loadComponent: () => import('./modules/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];