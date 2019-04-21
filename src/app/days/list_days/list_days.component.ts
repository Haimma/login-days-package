import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Day } from '../day.model';
import { BusinessDaysService } from '../businessDays.service';

@Component({
  selector: 'app-list-days',
  templateUrl: './list_days.component.html',
  styleUrls: ['./list_days.component.less']
})
export class ListDaysComponent implements OnInit, OnDestroy {
  // isLoading = false;
  businessDays: Day[] = [];
  private businessDaysSub: Subscription;
  isLoading = false;

  constructor(public businessDaysService: BusinessDaysService) {}

  // execute when the component create
  ngOnInit() {
    this.businessDaysService.getBusinessDays();
    this.businessDaysSub = this.businessDaysService.getBusinessDaysUpdateListener().subscribe((businessDays: Day[]) => {
      this.businessDays = businessDays;
    });
  }

  ngOnDestroy() {
    this.businessDaysSub.unsubscribe();
  }
}
