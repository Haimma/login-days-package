import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

import { BusinessDaysService } from '../businessDays.service';

@Component({
  selector: 'app-cal-days',
  templateUrl: './cal_days.component.html',
  styleUrls: ['./cal_days.component.less']
})

export class CalDaysComponent {
  // startDate = null;
  // endDate = null;

  constructor(public businessDaysService: BusinessDaysService) {}

  startControl = new FormControl('', [Validators.required]);
  endControl = new FormControl('', [Validators.required]);

  onAddDayCal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.businessDaysService.addBusinessDays(
      form.value.startDate,
      form.value.endDate, null);
    form.resetForm();
  }
}

