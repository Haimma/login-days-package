import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { CalPackagesComponent} from './cal_packages/cal_packages.component';
import { ListPackagesComponent} from './list_packages/list_packages.component';
@NgModule({
  declarations: [
    CalPackagesComponent,
    ListPackagesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class PackagesModule { }
