import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Package } from '../package.model';
import { PackagesService } from '../packages.service';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list_packages.component.html',
  styleUrls: ['./list_packages.component.less']
})
export class ListPackagesComponent implements OnInit, OnDestroy {

  packages: Package[] = [];
  private packagesSub: Subscription;
  private authStatusSub: Subscription;
  isLoading = false;

  constructor(public packagesService: PackagesService) {}

  // execute when the component create
  ngOnInit() {
    this.packagesService.getPackages();
    this.packagesSub = this.packagesService.getPackageUpdateListener().subscribe((packages: Package[]) => {
      this.packages = packages;
    });
  }

  ngOnDestroy() {
    this.packagesSub.unsubscribe();
  }
}
