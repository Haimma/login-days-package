import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

import { PackagesService } from '../packages.service';

// tslint:disable-next-line: class-name
export interface packagesValues {
  num: number;
}

@Component({
  selector: 'app-cal-packages',
  templateUrl: './cal_packages.component.html',
  styleUrls: ['./cal_packages.component.less']
})

export class CalPackagesComponent {
  width = null;
  height = null;
  length = null;
  weight = null;
  widthControl = new FormControl('', [Validators.required]);
  heightControl = new FormControl('', [Validators.required]);
  lengthControl = new FormControl('', [Validators.required]);
  weightControl = new FormControl('', [Validators.required]);
  values: packagesValues[] = [
    { num: 1},
    { num: 2},
    { num: 3},
    { num: 4},
    { num: 5},
    { num: 6},
  ];

  constructor(public packagesService: PackagesService) {}

  onAddPackageCal(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.packagesService.addPackage(
      form.value.width.num,
      form.value.height.num,
      form.value.length.num,
      form.value.weight.num,
      null);
    form.resetForm();
  }
}

