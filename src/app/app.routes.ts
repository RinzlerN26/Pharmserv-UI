import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SigninComponent } from './pages/signin/signin.component';
import { PharmaComponent } from './pages/pharma/pharma.component';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, adminGuard],
  },
  { path: 'signin', component: SigninComponent },
  {
    path: 'pharma',
    component: PharmaComponent,
    canActivate: [authGuard, userGuard],
  },
];
