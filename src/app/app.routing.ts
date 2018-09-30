import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FnfComponent } from './home/404.component';
import { AuthComponent } from './auth/auth.component'
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    { path: '404', component: FnfComponent},
    { path: 'login', component: LoginComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'user', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'dash', component: DashComponent, canActivate: [AuthGuard] },
    { path: '', component: HomeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '404' } // component: PageNotFoundComponent
];

// - Updated Export
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);