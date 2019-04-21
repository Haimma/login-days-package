import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatCardModule,
  MatNativeDateModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatListModule,
  MatDatepickerModule
} from '@angular/material';

@NgModule({
  exports: [
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule {}
