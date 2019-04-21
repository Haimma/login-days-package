import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { CalDaysComponent} from './days/cal_days/cal_days.component';
import { ListDaysComponent} from './days/list_days/list_days.component';
import { CalPackagesComponent} from './packages/cal_packages/cal_packages.component';
import { ListPackagesComponent} from './packages/list_packages/list_packages.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: CalPackagesComponent, canActivate: [AuthGuard]},
  { path: 'addBusinessDays', component: CalDaysComponent, canActivate: [AuthGuard]},
  { path: 'getBusinessDays', component: ListDaysComponent, canActivate: [AuthGuard]},
  { path: 'addPackages', component: CalPackagesComponent, canActivate: [AuthGuard]},
  { path: 'getPackages', component: ListPackagesComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
