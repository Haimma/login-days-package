import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Package } from './package.model';

@Injectable({providedIn: 'root'})
export class PackagesService {
  private packages: Package[] = [];
  private packagesUpdated = new Subject<Package[]>();

  constructor(private http: HttpClient) {}

  getPackages() {
    this.http
    .get<Package[]>('http://localhost:3000/api/Packages/get')
    .pipe(map((packageData) => {
      return packageData.map(pack => {
        return {
          height: pack.height,
          length: pack.length,
          rate: pack.rate,
          weight: pack.weight,
          width: pack.width,
        };
      });
    }))
    .subscribe((result) => {
      this.packages = result;
      this.packagesUpdated.next([...this.packages]);
    });
  }

  getPackageUpdateListener() {
    return this.packagesUpdated.asObservable();
  }

  addPackage(width: number, height: number, length: number, weight: number, rate: null) {
    const newPackage: Package = {width, height, length, weight, rate};
    this.http.post<{}>('http://localhost:3000/api/Packages/add', newPackage)
    .subscribe((res) => {
      this.packages.push(newPackage);
      this.packagesUpdated.next([...this.packages]);
    });
  }
}
