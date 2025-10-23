import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { 
    path: 'profile', 
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  { 
    path: 'sessions', 
    loadChildren: () => import('../client/sessions/sessions.module').then(m => m.SessionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }