import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule } from '@angular/forms';

import { CalDaysComponent } from './cal_days/cal_days.component';
import { ListDaysComponent } from './list_days/list_days.component';

@NgModule({
  declarations: [
    CalDaysComponent,
    ListDaysComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class DaysModule { }
