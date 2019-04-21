import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Day } from './day.model';

@Injectable({providedIn: 'root'})
export class BusinessDaysService {
  private days: Day[] = [];
  private daysUpdated = new Subject<Day[]>();

  constructor(private http: HttpClient) {}

  getBusinessDays() {
    this.http
    .get<Day[]>('http://localhost:3000/api/BusinessDays/get')
    .pipe(map((daysData) => {
      return daysData.map(bDays => {
        return {
          businessDays: bDays.businessDays,
          startDate: bDays.startDate,
          endDate: bDays.endDate,
        };
      });
    }))
    .subscribe((result) => {
      this.days = result;
      this.daysUpdated.next([...this.days]);
    });
  }

  getBusinessDaysUpdateListener() {
    return this.daysUpdated.asObservable();
  }

  addBusinessDays(startDate: string, endDate: string, businessDays: null) {
    const newBusinessDay: Day = {startDate, endDate, businessDays};
    this.http.post<{}>('http://localhost:3000/api/BusinessDays/add', newBusinessDay)
    .subscribe((res) => {
      this.days.push(newBusinessDay);
      this.daysUpdated.next([...this.days]);
    });
  }
}
