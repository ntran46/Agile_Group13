import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Register }             from './register/register';
import { Login }                from './login/login';


const appRoutes: Routes = [
  { path: 'register/register', component: Register },
  { path: 'login/login', component: Login },
  { path: '', redirectTo: '/register/register', pathMatch: 'full' }

];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);
